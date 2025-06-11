
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
            .sort({ createdAt: 1 }) // fetch from newest to oldest
            .populate("senderId", "_id name profilePic") // populate necessary fields
            .populate("receiverId", "_id name profilePic")
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
        const { text, images, receiverUserName } = req.body;

        // get my id and get sender id
        const myId = req.user._id;
        const { id: receiverId } = req.params;

        // check if user is sending a text or an image
        let imageUrl;
        if (images) {
            // upload it to the cloudinary bucket
            const uploadPic = await cloudinary.uploader.upload(images)
            imageUrl = uploadPic.secure_url;
        }
        // if its text
        const newMessage = new Messages({
            senderId: myId,
            receiverId: receiverId,
            text,
            images: imageUrl
        })
        await newMessage.save(); // save to db
        await newMessage.populate("senderId", "_id profilePic");

        // send it directly to user if user is online
        const io = req.app.get("io");
        const onlineUsers = io.onlineUsers

        // get the receiver username from the request body and verify if its in te online array
        // if true.. emit the new message to client
        const receiverOnline = onlineUsers[receiverUserName]
        if (receiverOnline) {
            io.to(receiverOnline).emit("new-message", newMessage)
        }
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in message Controller", error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

const searchUser = async (req, res) => {
    try {
        const query = req.query.query; // get the searched user via req query

        if (!query) return res.status(400).json({ message: "Query is required" });

        const user = await User.find({
            userName: { $regex: query, $options: 'i' }
        }).select("-password")

        // check if the user searched for doesn't exist send this message
        if (user.length === 0) {
            return res.status(400).json({ message: "No user found" })
        }
        // else send the user
        return res.status(200).json(user);
    } catch (error) {
        console.log("Search error:", error.message);
        return res.status(500).json({ error: "Server error" });
    }
}

const getUnreadCount = async (req, res) => {
    // get all unread messages count per user
    const userId = req.user._id;

    const counts = await Messages.aggregate([
        {
            $match: { receiverId: userId, isRead: false }
        },
        {
            $group: {
                _id: "$senderId",
                count: { $sum: 1 }
            }
        }
    ]);
    res.json(counts);
}

const messageRead = async (req, res) => {
    // function updates the messages in the db to true
    try {
        const receiverId = req.user._id // where i am  the receiver
        const { senderId } = req.params;

        await Messages.updateMany(
            { senderId, receiverId, isRead: false }, // find the messages
            { $set: { isRead: true } }  // update them to true
        );

        res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const recentChats = async (req, res) => {
    // get recent user chats for mobile screen
    try {
        const myId = req.user._id;

        const messages = await Messages.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: myId },
                        { receiverId: myId }
                    ]
                }
            },
            {
                $addFields: {
                    otherUserId: {
                        $cond: {
                            if: { $eq: ["$senderId", myId] },
                            then: "$receiverId",
                            else: "$senderId"
                        }
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: "$otherUserId",
                    lastMessage: { $first: "$text" },
                    lastMessageAt: { $first: "$createdAt" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    userId: "$user._id",
                    userName: "$user.userName",
                    profilePic: "$user.profilePic",
                    lastMessage: 1,
                    lastMessageAt: 1
                }
            },
            {
                $sort: { lastMessageAt: -1 }
            }
        ]);

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching recent chats:", error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

module.exports = { getMessage, getUsers, sendMessage, searchUser, getUnreadCount, messageRead, recentChats };
