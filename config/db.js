const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('apquiz', 'root', '1234', {
    host: 'apquiz_mysql',
    port: 3306,
    dialect: 'mysql'
});

module.exports = sequelize