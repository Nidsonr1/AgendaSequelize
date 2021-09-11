const Sequelize = require('sequelize');
const DbConfig = require('../config/dbConfig');
const UserModel = require('../models/UserModels');
const ContactModels = require('../models/ContactModels');

const connection = new Sequelize(DbConfig.development);

UserModel.init(connection);
ContactModels.init(connection);
ContactModels.associate(connection.models)


module.exports = connection;