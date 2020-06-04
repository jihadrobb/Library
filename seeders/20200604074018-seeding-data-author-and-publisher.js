'use strict';
const data_author = require('../files/authors.json');
const data_publisher = require('../files/publishers.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    data_author.forEach(el => {
      el.createdAt = new Date;
      el.updatedAt = new Date;
    });
    data_publisher.forEach(el => {
      el.createdAt = new Date;
      el.updatedAt = new Date;
    });
    return queryInterface.bulkInsert('Authors', data_author)
      .then(res => {
        return queryInterface.bulkInsert('Publishers', data_publisher);
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors')
      .then(res => {
        return queryInterface.bulkDelete('Publishers');
      })
  }
};
