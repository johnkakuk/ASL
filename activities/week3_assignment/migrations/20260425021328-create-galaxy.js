'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Galaxies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      galaxyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      galaxySize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      galaxyDescription: {
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Galaxies');
  }
};
