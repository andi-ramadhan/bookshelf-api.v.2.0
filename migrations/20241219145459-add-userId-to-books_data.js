/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books_data', 'userId', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users', // Name of the Users table
        key: 'userId' // Column name in Users table
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books_data', 'userId');
  }
};
