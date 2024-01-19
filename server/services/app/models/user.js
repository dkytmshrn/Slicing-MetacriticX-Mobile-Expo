'use strict';
const {
  Model
} = require('sequelize');

const { makeItLow } = require('../Helpers/toLower');
const {hashPassword} = require ('../Helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Movie, { foreignKey: 'AuthorId' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'E-mail incorrect',
        },
        notEmpty: {
          msg: 'E-mail is required',
        },
        notNull: {
          msg: 'E-mail is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 20],
          msg: 'Password must be at 7-20 characters',
        },
        notEmpty: {
          msg: 'Password is required',
        },
        notNull: {
          msg: 'Password is required',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Role is required',
        },
        notNull: {
          msg: 'Role is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.email = makeItLow(instance.email)
    instance.password = hashPassword(instance.password)
  })

  return User;
};