'use strict';
const data_book = require('../files/books.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    data_book.forEach(el => {
      el.createdAt = new Date;
      el.updatedAt = new Date;
    });
    return queryInterface.bulkInsert('Books', data_book);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books');
  }
};
