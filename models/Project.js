const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define("Project", {
 id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
});

module.exports = Project;