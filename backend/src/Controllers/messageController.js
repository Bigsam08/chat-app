
const User = require("../Models/User.model");
const Messages = require("../Models/message.model");
const cloudinary = require("../Utils/cloudinary");

const getUsers = async (req, res) => {
    try {
        // fetch all users currently logged in
        // first fetch the current user id from middleware auth

        const user = req.user._id;

        // query db to fetch all the user data excluding current user and all passwords
        const allUsers = await User.find({ _id: { $ne: user } }).select("-password")
        // return all users to client
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in message Controller", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}

const getMessage = async (req, res) => {
    try {

        // to get messages between myself and the other users

        const myId = req.user._id; // fetch my id
        const { id: friendsId } = req.params; // fetch friends id

        // search db to find messages between user and myself or myself and the user
        // send messages as json if there is

        const messages = await Messages.find({
            $or: [
                { senderId: myId, receiverId: friendsId },
                { senderId: friendsId, receiverId: myId }
            ],
        })
            .sort({ createdAt: -1 }) // fetch from newest to oldest
            .exec(); // execute the query like promise

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in message Controller", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

const sendMessage = async (req, res) => {
    try {

        // to send a message
        // get the user message or image from the post verb
        const { text, images } = req.body;

        // get my id and get sender id
        const myId = req.user._id;
        const { id: senderId } = req.params;

        // check if user is sending a text or an image
        let imageUrl;
        if (images) {
            // upload it to the cloudinary bucket
            const uploadPic = await cloudinary.uploader.upload(images)
            imageUrl = uploadPic.secure_url;
        }
        // if its text
        const newMessage = new Messages({
            senderId,
            receiverId: myId,
            text,
            images: imageUrl
        })
        await newMessage.save();
        res.status(201).json(newMessage);

        // re

    } catch (error) {
        console.log("Error in message Controller", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { getMessage, getUsers, sendMessage };
