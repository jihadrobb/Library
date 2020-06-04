'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Books', ['PublisherId'], {
        type: 'foreign key',
        name: 'custom_fkey_PublisherId',
        references: { //Required field
          table: 'Publishers',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Books', ['AuthorId'], {
        type: 'foreign key',
        name: 'custom_fkey_AuthorId',
        references: { //Required field
          table: 'Authors',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('Books', 'custom_fkey_PublisherId'),
      queryInterface.removeConstraint('Books', 'custom_fkey_AuthorId')
    ]);
  }
};
