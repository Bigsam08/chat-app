const mongoose = require('mongoose');


/**
 * UserModel- creates a model for user details to be stored in the mongoDB 
 * mongoose - is used to connect express with MongoDB to create new Schema
 * User- export model
 * collection Name - USer
 * email Unique - set email as unique key that cant be replicated
 */
const userSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    profilePic : {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    }
},

{timestamps: true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
