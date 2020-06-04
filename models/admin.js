'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Admin extends Model {

  }
  Admin.init({
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
    }
  }, {
    sequelize
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};