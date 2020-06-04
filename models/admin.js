'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Admin extends Model {

  }
  Admin.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
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
        notEmpty: {
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
  Admin.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash;
  })
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};