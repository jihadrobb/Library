'use strict';
const bcrypt = require('bcrypt');
const admins = require('../files/admins.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    admins.forEach(el => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(el.password, salt);
      el.password = hash;
      el.createdAt = new Date;
      el.updatedAt = new Date;
    });
    return queryInterface.bulkInsert('Admins', admins);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins');
  }
};
