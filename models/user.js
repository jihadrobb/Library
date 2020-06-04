'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'You\'re supposed to have a username!'
        },
        len: {
          args: [3,10],
          msg: 'Please input min 3 characters and max 10 characters for username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'You\'re supposed to have a password!'
        },
        len: {
          args: [5,20],
          msg: 'Please input min 5 characters and max 20 characters for password'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please input correct Email Address'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        // on progress
      }
    }
  }, {
    sequelize
  });
  User.associate = function(models) {
    User.belongsToMany(models.Book, { through: 'User_Book' });
  };
  return User;
};