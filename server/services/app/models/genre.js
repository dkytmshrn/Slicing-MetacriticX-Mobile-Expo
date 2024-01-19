'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, { 
        foreignKey: 'GenreId',
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
        hooks: true,
        individualHooks: true, 
      })
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Genre is required',
        },
        notNull: {
          msg: 'Genre is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};