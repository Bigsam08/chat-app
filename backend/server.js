/**
 * server main entry point
 */


const express = require('express');
require('dotenv').config(); // import dotenv configuration

const cookieParser = require("cookie-parser");
const cors = require("cors");

const db_connection = require('./src/DB/db.config');  //import the db configuration
const authRoute = require('./src/Routes/authRoute') //import the api endpoint module from the route.
const messageRoute = require("./src/Routes/messageRoute");

const { server, app } = require("./src/Utils/socketServer"); // import socket io


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
