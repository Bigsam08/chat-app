/**
 * setting up my socket server
 */

/**
 * first require express and turn it to an app
 * after require http and pass the app to it  server = http.createServer(app)
 * then turn the app server inside socket 
 */

const socketIo = require("socket.io");  // import the socket library

const onlineUsers = {};  // create an empty dictionary to store all connected users 

const socketInitializer = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: process.env.FRONTEND_SERVER,
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        },
    });

    /** connection event listener to pick when a user comes online
     * a callback function to do an action passing an argument into the function (socket)
     */
    io.onlineUsers = onlineUsers; // this makes online users accessible globally in the app

    io.on("connection", (socket) => {
        console.log("A user is online with id", socket.id);

        // listen to the frontend connect with the backend with a custom event called join
        // get the userid from the front end and save it in the json onlineUsers dict
        // ket is the userId and the value is the connection id
        socket.on("join", ({ userId, userName }) => {
            if (userId && userName) {
                socket.userId = userId;
                socket.userName = userName;
                onlineUsers[userName] = socket.id;
                console.log(`user ${userName} is online with socket id ${socket.id}`)
                // announce a user has come online
                io.emit("announce", { userNames: Object.keys(onlineUsers) });
            }

        });

        // listen to when a user disconnects and broadcast it
        // also delete the user from the list of online users in the usersOnline dict

        socket.on('disconnect', () => {
            const userName = socket.userName;
            if (userName && onlineUsers[userName] === socket.id) {
                delete onlineUsers[userName];
                console.log(`User ${userName} went offline`);
                io.emit("announce", { userNames: Object.keys(onlineUsers) });
            }
        });

    });

    return io;
};


// Utility function to get an online user by ID
const getOnlineUser = (userId) => {
    return onlineUsers[userId]; // returns { username }
};


module.exports = { socketInitializer, getOnlineUser };