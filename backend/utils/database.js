const Sequelize = require('sequelize');

const sequelize = new Sequelize('espaceclient', 'root','root', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
