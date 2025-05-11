/**
 * create a message schema
 */

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true

    },
    text : {
        type : String
    },
    images : {
        type : String
    }
},
{timestamps: true}
)

const MessageModel = mongoose.model("messages", messageSchema);

module.exports = MessageModel;
