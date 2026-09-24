const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Feedback = sequelize.define("Feedback", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  nota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Feedback;