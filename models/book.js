'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Book extends Model {

  }
  Book.init ({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Book must have a title'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Book must have a genre'
        }
      }
    },
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Isn\'t the book released yet? Please input the year'
        }
      }
    },
    PublisherId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Book must have a publisher'
        }
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Book must have an author'
        }
      }
    }
  }, {
    sequelize
  });
  Book.associate = function(models) {
    Book.belongsTo(models.Author);
    Book.belongsTo(models.Publisher);
    Book.belongsToMany(models.User, { through: 'User_Books' });
  };
  return Book;
};