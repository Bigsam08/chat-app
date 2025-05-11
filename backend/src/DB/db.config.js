/**
 * This file handles the mondoDb connection
 */

const mongoose = require('mongoose'); //mongodb library for js connection
require('dotenv').config();

const db_connection = async () => {
    try {
        const db = await  mongoose.connect(process.env.MONGODB_URL);
        console.log(`DataBase successfully connected!!! to ${db.connection.host}`);
        
    } catch (error) {
        console.log(`Failed to connect to database`, error);  
    }
}

module.exports = db_connection;
