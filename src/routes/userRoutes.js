const express = require('express');
const { createuserController, loginuserController, getuserController } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', createuserController);
router.post('/login', loginuserController);
router.get('/:id', getuserController);

module.exports = router;