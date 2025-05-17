const express = require("express");
const router = express.Router();

const authMiddleware = require("../MiddleWare/auth.middleWare")
const { getMessage, getUsers, sendMessage } = require("../Controllers/messageController");

router.get('/all-users', authMiddleware, getUsers); // fetch all users/friends
router.get('/get-chats/:id', authMiddleware, getMessage); // fetch messages
router.post('/send-messages/:id', authMiddleware, sendMessage); // send messages


module.exports = router;
