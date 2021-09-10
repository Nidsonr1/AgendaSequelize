const Sequelize = require('sequelize');
const DbConfig = require('../config/dbConfig');
const UserModel = require('../models/UserModels');


const connection = new Sequelize(DbConfig.development);

UserModel.init(connection);

module.exports = connection;