'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      starName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      starSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      starDescription: {
        type: Sequelize.TEXT
      },
      GalaxyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Galaxies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    // Custom. Copied and pasted from above

    await queryInterface.createTable('Planets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planetName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      planetSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      planetDescription: {
        type: Sequelize.TEXT
      },
      StarId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable('StarsPlanets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StarId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Planets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StarsPlanets');
    await queryInterface.dropTable('Planets');
    await queryInterface.dropTable('Stars');
  }
};
