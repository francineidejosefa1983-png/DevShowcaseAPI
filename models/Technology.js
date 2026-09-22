const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Technology = sequelize.define("Technology", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Technology;