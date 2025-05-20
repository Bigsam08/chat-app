/**
 * socket input and out put
 */
const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app)
const { Server } = require("socket.io")


//connect socket io to the frontend through cors
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_SERVER],
    },
})

// store online users
const usersSocket = {};

function getReceiverSocketId(userId) {
    return usersSocket[userId];   
}

// when socket is active
io.on("connection", (socket) => {
    // console.log("A user is Online", socket.id); creates a unique session id

    // check for socket handshake
    const userId = socket.handshake.query.userId;
    // if userId detected store it in the userSocket Object
    // the user id and the socket id
    if(userId) {
        usersSocket[userId] = socket.id;
    }

    // io.emit will notify all online users a new user is online
    io.emit("getOnlineUsers", Object.keys(usersSocket));
    // listen to events when a user disconnects


    socket.on("disconnect", () => {
        delete usersSocket[userId]; //  delete the user id from the online users object
        io.emit("getOnlineUsers", Object.keys(usersSocket)) // announce user left the net
    });
});

module.exports = { io, server, app, getReceiverSocketId }