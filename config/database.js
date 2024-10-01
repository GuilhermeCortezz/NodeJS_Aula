const Sequelize = require('sequelize');
sequelize = new Sequelize(
    'CRUD',
    'root',
    'mysqluser', 
    {
        host:'localhost',
        dialect:'mysql',
    }
)

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}