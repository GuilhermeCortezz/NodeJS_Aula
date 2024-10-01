const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

module.exports = (sequelize) => {
    const Empregado = sequelize.define('empregado', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salarioBruto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        departamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    //Empregado.sync({force: true})
    return Empregado;
};
