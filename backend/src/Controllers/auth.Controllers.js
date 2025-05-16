/**
 * Controllers is used to make code clean and organized
 * this is used to handle all http request and responses
 * helps for debugging purposes i.e maintainability
 * this handles what happens, defining the logic behind every route end point making routes file clean
 * this handles functionality of every end point
 * this is the logic for user endpoint authentications
 */

const bcrypt = require('bcrypt'); // to hash the password
const generateToken = require('../Utils/generateJwt');
const cloudinary = require('../Utils/cloudinary');

const User = require('../Models/User.model') // model schema for users
const Message = require('../Models/message.model') // message model

const checkAuth = async (req, res) => {
    /**
     * once the user has passed authentication
     * send User details back to client
     * anytime user refreshes page
     */

    try {
        //send the user details gotten from inside the cookies id
        res.status(200).json({
            user: {
                email: req.user.email,
                userName: req.user.userName,
                profilePic: req.user.profilePic,
                status: req.user.status,
                createdAt: req.user.createdAt
            }
        })

    } catch (error) {
        console.log("error in check controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const register = async (req, res) => {
    const { email, password, userName } = req.body;
    try {
        // check if all fields are filled

        if (!email || !password || !userName) {
            return res.status(400).json({ message: "All fields must be filled" });
        }
        // check if email already exist in the DB
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // confirm password is greater than 8 characters long
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }


        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user the User Schema
        const newUser = new User({
            email,
            password: hashPassword,
            userName
        });

        // save new user to database
        await newUser.save();
        res.status(201).json({
            message: "Account created Successfully"
        })

    } catch (error) {
        console.log("error in the register controller", error.message)
        return res.status(500).json({
            message: "internal server Error", error: error.message
        })
    };

}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" })

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // compare hashed password with the one from the user
        const isPasswordIn = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordIn) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // if password and email is found
        // generate a jwt for the login
        generateToken(checkUser._id, res);
        return res.status(200).json({
            message: "Authentication Successful!",
            user: {
                email: checkUser.email,
                userName: checkUser.userName,
                profilePic: checkUser.profilePic,
                status: checkUser.status,
                createdAt: checkUser.createdAt
            }
        })
    } catch (error) {
        console.log("Error in the controller connection", error.message);
        return res.status(500).json({ message: " Internal Server error" });
    }
}

const logout = async (req, res) => {
    // when user logouts out clear the cookies
    // expiration set to maxAge of 0 and token becomes and empty string

    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Log out successful!!" });

    } catch (error) {
        console.log("error in the auth controller", error.message);
        return res.status(500).json({ message: "internal Server error!" });
    }
}

const updateProfilePic = async (req, res) => {
    /**
     * Function for user to update status
     * get the pic url via req.body
     */
    try {
        const { profilePic } = req.body; //get the uploaded image url
        const userId = req.user._id; // get the userid

        // check if the user has a profile pic
        // return 404 missing profile pic message
        if (!profilePic) return res.status(404).json({ message: "profile pic is required" });

        // if the pp image is passed in the request body
        // upload it to the cloudinary bucket
        const uploadPic = await cloudinary.uploader.upload(profilePic);

        // update the pic and store it in the user DB
        // find the user by his id and update the pp field

        const user = await User.findByIdAndUpdate(userId, {
            profilePic: uploadPic.secure_url
        },
            { new: true }
        )
        // send back the profile pic updated 
        res.status(200).json({ profilePic: user.profilePic });

    } catch (error) {
        console.log("error in  profile controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateStatus = async (req, res) => {
    // update user status in the db
    try {
        // get the user id
        const userId = req.user._id;
        const user = await User.findById(userId);
        user.status = req.body.status; // status update gotten from the front end
        await user.save(); // save to db 
        return res.status(200).json({ message: "Status updated successfully", updatedStatus: user.status });
    } catch (error) {
        console.log("error in the update status controller", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user._id;
    try {
        // for parallel deletion and faster
        // delete all the user messages int he message model
        // delete all the user data in the user model
        await Promise.all([
            Message.deleteMany({ user: userId }),
            User.findByIdAndDelete(userId)
        ]);

        // delete jwt in cookie
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Account successfully deleted" });

    } catch (error) {
        console.error("Delete error:", error.message);
        res.status(500).json({ message: "Failed to delete account" });
    }

}

module.exports = { register, login, logout, updateProfilePic, updateStatus, checkAuth, deleteUser };