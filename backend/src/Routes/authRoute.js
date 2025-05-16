const express = require('express');
const Router = express.Router();
const { register, login, logout, updateProfilePic, updateStatus, checkAuth, deleteUser } = require('../Controllers/auth.Controllers')
const authMiddleware = require("../MiddleWare/auth.middleWare");


Router.post('/register', register);

Router.post('/login', login);

Router.post('/logout', logout);

Router.put('/update-profilePic', authMiddleware, updateProfilePic);

Router.put('/update-status', authMiddleware, updateStatus);

Router.get('/check', authMiddleware, checkAuth);

Router.delete('/delete-user', authMiddleware, deleteUser)

module.exports = Router;

