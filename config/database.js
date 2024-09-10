const Sequelize = require('sequelize');
sequelize = new Sequelize(
    'AULA1',
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