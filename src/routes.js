const express = require('express');
const route = express.Router();
const UserController = require('./controllers/UserController');

route.post('/user/register', UserController.create);
route.post('/user/login', UserController.login);

module.exports = route;