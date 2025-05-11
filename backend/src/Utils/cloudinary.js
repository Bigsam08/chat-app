const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");

config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.ClOUDINARY_API_KEY,
    api_secret: process.env.ClOUDINARY_SECRET_API_KEY
});

module.exports = cloudinary;
