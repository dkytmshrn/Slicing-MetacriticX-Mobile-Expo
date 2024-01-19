'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cast.belongsTo(models.Movie, { foreignKey: 'MovieId' })
    }
  }
  Cast.init({
    MovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Movie ID is required',
        },
        notNull: {
          msg: 'Movie ID is required',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Cast name is required',
        },
        notNull: {
          msg: 'Cast name is required',
        },
      },
    },
    profilePict: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Profile picture is required',
        },
        notNull: {
          msg: 'Profile picture is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};