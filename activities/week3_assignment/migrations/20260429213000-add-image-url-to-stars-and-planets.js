'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Stars', 'starImageURL', {
            type: Sequelize.TEXT,
            allowNull: true,
        });

        await queryInterface.addColumn('Planets', 'planetImageURL', {
            type: Sequelize.TEXT,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Planets', 'planetImageURL');
        await queryInterface.removeColumn('Stars', 'starImageURL');
    },
};
