/**
 * Middleware auth function
 * verify if user is login, authenticated to make changes 
 * check if token exits in the cookies and also verify if the token is same with that in the server
*/

const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

const authMiddleware = async (req, res, next) => {
    try {
        // first confirm if there is any token stored in the cookies
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ error: "Unauthorized", message: "No token Found" })

        // verify if the token is true
        // passing the token and secret key
        // if not true do not grant access
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) return res.status(401).json({ error: "Unauthorized", message: "Invalid token" })


        // After passing both checks still confirm user id
        // verify if the user is found in the database using 
        // cookies parser to extract the user id from the token
        const user = await User.findById(decode.userId).select("-password") // find in database if userid match, fetch all data except the password
        if (!user) return res.status(404).json({ error: "Unauthorized", message: "User not found" })
        req.user = user

        // after passing all authorization
        // allow the user permission to move to the next action (function)
        next();

    } catch (error) {
        console.log("error in the auth middleware", error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }

}

module.exports = authMiddleware;
