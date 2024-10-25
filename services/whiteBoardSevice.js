const { Whiteboard } = require("../db/mongo-schema");
const { TLSocketRoom } = require('@tldraw/sync-core');

const activeRooms = new Map();

const whiteboardService = {
    async getOrCreateRoom(roomId) {
        try {
            if(activeRooms.has(roomId)){
                const roomState = activeRooms.get(roomId);

                if(!roomState.room.isClosed()){
                    return roomState.room;
                }
            }

            // load snapshot from db
            let snapshot = null;
            const whiteboardData = await Whiteboard.findOne({roomId});
            if(whiteboardData){
                snapshot = whiteboardData.snapshot;
            }

            const roomState = {
                needsPersist: false,
                id: roomId,
                room: new TLSocketRoom({
                    initialSnapshot: snapshot,
                    onSessionRemoved(room, args) {
                        console.log('client disconnected', args.sessionId, roomId);

                        if(args.numSessionsRemaining === 0){
                            room.close();
                        }
                    },
                    onDataChange() {
                        roomState.needsPersist = true;
                    }
                })

            }
            activeRooms.set(roomId, roomState);
            return roomState.room;
        } catch (error) {
            console.error(error);
        }
    },

    async persistRoom(roomId) {
        try {
          const roomState = activeRooms.get(roomId);
          if (!roomState || !roomState.needsPersist) return;
    
          const snapshot = roomState.room.getCurrentSnapshot();
          
          await Whiteboard.findOneAndUpdate(
            { roomId },
            { 
              snapshot,
              lastModified: new Date()
            },
            { upsert: true }
          );
    
          roomState.needsPersist = false;
          console.log('Room persisted:', roomId);
        } catch (error) {
          console.error('Error persisting room:', error);
          throw error;
        }
      },
    
      closeRoom(roomId) {
        const roomState = activeRooms.get(roomId);
        if (roomState) {
          roomState.room.close();
          activeRooms.delete(roomId);
        }
      }
    };
    
    // Persist rooms periodically
    setInterval(async () => {
      for (const [roomId, roomState] of activeRooms.entries()) {
        if (roomState.needsPersist) {
          await whiteboardService.persistRoom(roomId);
        }
        if (roomState.room.isClosed()) {
          activeRooms.delete(roomId);
        }
      }
    }, 2000);
    
module.exports = whiteboardService;
