const express = require("express");
const router = express.Router();

const authMiddleware = require("../MiddleWare/auth.middleWare")
const { getMessage, getUsers, sendMessage } = require("../Controllers/messageController");

router.get('/users', authMiddleware, getUsers); // fetch all users/friends
router.get('/:id', authMiddleware, getMessage); // fetch messages
router.post('/sendMessages/:id', authMiddleware, sendMessage); // send messages


module.exports = router;
