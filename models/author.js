'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Author extends Model {
    get fullname(){
      return `${this.first_name} ${this.last_name}`;
    }
  }
  Author.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.last_name){
          instance.last_name = instance.first_name;
        }
      }
    }
  });
  Author.associate = function(models) {
    Author.hasMany(models.Book);
  };
  return Author;
};