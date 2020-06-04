'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Book extends Model {

  }
  Book.init ({
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Book must have a title'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Book must have a genre'
        }
      }
    },
    avg_rating: DataTypes.INTEGER,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Isn\'t the book released yet? Please input the year'
        }
      }
    },
    PublisherId: DataTypes.INTEGER,
    AuthorId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Book.associate = function(models) {
    Book.belongsTo(models.Author);
    Book.belongsTo(models.Publisher);
    Book.belongsToMany(models.User, { through: 'User_Book' });
  };
  return Book;
};