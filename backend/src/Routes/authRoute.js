const express = require('express');
const Router = express.Router();
const { register, login, logout, update, checkAuth } = require('../Controllers/auth.Controllers')
const authMiddleware = require("../MiddleWare/auth.middleWare");


Router.post('/register', register);

Router.post('/login', login);

Router.post('/logout', logout);

Router.put('/update', authMiddleware, update);

Router.get('/check', authMiddleware, checkAuth);

module.exports = Router;

