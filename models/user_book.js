'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User_Book extends Model {

  }
  User_Book.init({
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Did you enjoy the book? Please rate (and give review for others if possible)'
        }
      }
    },
    review: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        instance.createdAt = new Date();
        instance.updatedAt = new Date();
        if(!instance.borrow_date){
          instance.borrow_date = new Date();
        }
      },
      beforeUpdate: (instance, options) => {
        if(!instance.return_date){
          instance.return_date = new Date();
        }
      }
    }
  });
  User_Book.associate = function(models) {
    User_Book.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id' });
    User_Book.belongsTo(models.Book, { foreignKey: 'BookId', targetKey: 'id' });
  };
  return User_Book;
};