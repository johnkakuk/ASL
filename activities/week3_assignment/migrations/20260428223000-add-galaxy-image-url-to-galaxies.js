'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const table = await queryInterface.describeTable('Galaxies');

        if (!table.galaxyImageURL) {
            await queryInterface.addColumn('Galaxies', 'galaxyImageURL', {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        }
    },

    async down(queryInterface, Sequelize) {
        const table = await queryInterface.describeTable('Galaxies');

        if (table.galaxyImageURL) {
            await queryInterface.removeColumn('Galaxies', 'galaxyImageURL');
        }
    },
};
