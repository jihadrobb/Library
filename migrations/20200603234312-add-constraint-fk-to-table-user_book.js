'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('User_Books', ['UserId'], {
        type: 'foreign key',
        name: 'custom_fkey_UserId',
        references: { //Required field
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('User_Books', ['BookId'], {
        type: 'foreign key',
        name: 'custom_fkey_BookId',
        references: { //Required field
          table: 'Books',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('User_Books', 'custom_fkey_UserId'),
      queryInterface.removeConstraint('User_Books', 'custom_fkey_BookId')
    ]);
  }
};
