'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Movie.belongsTo(models.User, { foreignKey: 'AuthorId' })
      Movie.belongsTo(models.Genre, { foreignKey: 'GenreId' })
      Movie.hasMany(models.Cast, { 
        foreignKey: 'MovieId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
        hooks: true,
        individualHooks: true,
      })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      unique: true ,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required',
        },
        notNull: {
          msg: 'Title is required',
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Slug is required',
        },
        notNull: {
          msg: 'Slug is required',
        },
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Synopsis is required',
        },
        notNull: {
          msg: 'Synopsis is required',
        },
      },
    },
    trailerUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'TrailerUrl is required',
        },
        notNull: {
          msg: 'TrailerUrl is required',
        },
      },
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ImgUrl is required',
        },
        notNull: {
          msg: 'ImgUrl is required',
        },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Rating is required',
        },
        notNull: {
          msg: 'Rating is required',
        },
      },
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Genre ID is required',
        },
        notNull: {
          msg: 'Genre ID is required',
        },
      },
    },
    AuthorId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author ID is required',
        },
        notNull: {
          msg: 'Author ID is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};