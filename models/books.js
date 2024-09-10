const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

module.exports = (sequelize) => {

    var Books = sequelize.define(
        'books',
        {
        id:{
            type:DataTypes.BIGINT(20),
            primaryKey:true,
            autoIncriment:true
        },
        title:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING,
        },
        },
        {
            timestamps: false
        }
    );
    Books.sync({force: true})
return Books;
}