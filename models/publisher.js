'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Publisher extends Model {

  }
  Publisher.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input Publisher\'s name'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input Publisher\'s address'
        }
      }
    }
  }, {
    sequelize
  });
  Publisher.associate = function(models) {
    Publisher.hasMany(models.Book);
  };
  return Publisher;
};