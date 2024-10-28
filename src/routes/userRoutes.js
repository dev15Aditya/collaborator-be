const express = require('express');
const { createuserController, loginuserController } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', createuserController);
router.post('/login', loginuserController);

module.exports = router;