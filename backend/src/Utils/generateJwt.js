/** 
 *  create a jwt and return cookies
 * To create a jwt takes 3 arguments
 * @param {string} userId - The ID of the authenticated user.
 * @param {object} res - Express response object (to set cookies).
 * @returns {string} - The generated JWT token.
*/

const jwt = require('jsonwebtoken');

const createJwt = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP_DAY })

    // check if we are in production or development
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7 days to milliseconds
        sameSite: isProduction, //  Cross-site request forgery attack
        httpOnly: true, // This will prevent XSS attack Crosssite Script Attack
        secure: isProduction // Use secure cookies in production
    });

    return token;
}


module.exports = createJwt;