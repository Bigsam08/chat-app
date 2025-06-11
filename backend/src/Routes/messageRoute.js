const express = require("express");
const router = express.Router();

const authMiddleware = require("../MiddleWare/auth.middleWare")
const { getMessage, getUsers, sendMessage, searchUser, getUnreadCount, messageRead, recentChats } = require("../Controllers/messageController");

router.get('/search-user', authMiddleware, searchUser); // fetch a specific user throught query
router.get('/all-users', authMiddleware, getUsers); // fetch all users/friends
router.get('/get-chats/:id', authMiddleware, getMessage); // fetch messages
router.post('/send-messages/:id', authMiddleware, sendMessage); // send messages with the receiver id passed
router.get('/unread-count', authMiddleware, getUnreadCount); // fetch unread messages
router.put('/mark-messages/:senderId', authMiddleware, messageRead); // update state, mark messages as read fot notification
router.get('/recent-chats', authMiddleware, recentChats); // fetch contacts the user has contacted for mobile screen


module.exports = router;
