const express = require('express');
const route = express.Router();
const UserController = require('./controllers/UserController');
const ContactController = require('./controllers/ContactController')

route.post('/user/register', UserController.create);
route.post('/user/login', UserController.login);

route.get('/contacts/:user_id', ContactController.index);
route.post('/contact/:user_id/register', ContactController.create);

module.exports = route;