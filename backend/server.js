/**
 * server main entry point
 */

require('dotenv').config(); // import dotenv configuration

const express = require('express');
const app = express();

const http = require("http");
const server = http.createServer(app);

const { socketInitializer } = require("./src/Utils/socketServer"); // import socket io
const io = socketInitializer(server); // connect socket io function to the server
app.set('io', io); // sets io to be globally used in the app


const cookieParser = require("cookie-parser");
const cors = require("cors");

const db_connection = require('./src/DB/db.config');  //import the db configuration
const authRoute = require('./src/Routes/authRoute') //import the api endpoint module from the route.
const messageRoute = require("./src/Routes/messageRoute");



const PORT = process.env.PORT


app.use(cookieParser()) //allows to extract data from inside the cookies
app.use(express.json({ limit: '10mb' })); // get json request and response from user
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: process.env.FRONTEND_SERVER,
    credentials: true
}));



app.use('/api/auth', authRoute); // routes for all authentication 
app.use("/api/", messageRoute); // routes for all messages


server.listen(PORT, () => {
    console.log(`server now running on localhost:${PORT}`)
    db_connection();
});
