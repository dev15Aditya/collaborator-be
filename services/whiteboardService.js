const whiteboards = new Map();
const generateUniqueId = require('../utils/generateUniqueId');

// Create a new room
function createRoom() {
  const roomId = generateUniqueId();
  whiteboards.set(roomId, []);
  return roomId;
}

// Get the current state of a whiteboard
function getWhiteboardState(roomId) {
  return whiteboards.get(roomId) || [];
}

// Update the whiteboard state
function updateWhiteboardState(roomId, action) {
  const currentState = getWhiteboardState(roomId);
  currentState.push(action);
  whiteboards.set(roomId, currentState);
}

// Undo an action
function undoAction(roomId, actionId) {
  const currentState = getWhiteboardState(roomId);
  const updatedState = currentState.filter(action => action.id !== actionId);
  whiteboards.set(roomId, updatedState);
}

// Redo an action
function redoAction(roomId, action) {
  updateWhiteboardState(roomId, action);
}

module.exports = {
  createRoom,
  getWhiteboardState,
  updateWhiteboardState,
  undoAction,
  redoAction
};
