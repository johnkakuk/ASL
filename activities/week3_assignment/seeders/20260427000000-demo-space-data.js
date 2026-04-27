'use strict';

// Had the ChatGPT man whip up a seeder file for testing purposes

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('StarsPlanets', null, {});
        await queryInterface.bulkDelete('Planets', null, {});
        await queryInterface.bulkDelete('Stars', null, {});
        await queryInterface.bulkDelete('Galaxies', null, {});

        const galaxies = [
            {
                id: 1,
                galaxyName: 'Galaxy 1',
                galaxySize: 100000,
                galaxyDescription: 'Demo galaxy 1'
            },
            {
                id: 2,
                galaxyName: 'Galaxy 2',
                galaxySize: 200000,
                galaxyDescription: 'Demo galaxy 2'
            },
            {
                id: 3,
                galaxyName: 'Galaxy 3',
                galaxySize: 300000,
                galaxyDescription: 'Demo galaxy 3'
            }
        ];

        const stars = [];
        const planets = [];
        const starsPlanets = [];

        const starLetters = ['A', 'B', 'C'];
        let starId = 1;
        let planetId = 1;

        for (let galaxyId = 1; galaxyId <= 3; galaxyId += 1) {
            for (const letter of starLetters) {
                const currentStarId = starId;

                stars.push({
                    id: currentStarId,
                    starName: `Star ${letter}`,
                    starSize: 1000 + currentStarId,
                    starDescription: `Demo star ${letter} in Galaxy ${galaxyId}`,
                    GalaxyId: galaxyId
                });

                starId += 1;

                for (let i = 1; i <= 3; i += 1) {
                    const currentPlanetId = planetId;

                    planets.push({
                        id: currentPlanetId,
                        planetName: `Planet ${letter}${i}`,
                        planetSize: 100 + currentPlanetId,
                        planetDescription: `Demo planet ${letter}${i} orbiting Star ${letter} in Galaxy ${galaxyId}`,
                        StarId: currentStarId
                    });

                    starsPlanets.push({
                        StarId: currentStarId,
                        PlanetId: currentPlanetId
                    });

                    planetId += 1;
                }
            }
        }

        await queryInterface.bulkInsert('Galaxies', galaxies, {});
        await queryInterface.bulkInsert('Stars', stars, {});
        await queryInterface.bulkInsert('Planets', planets, {});
        await queryInterface.bulkInsert('StarsPlanets', starsPlanets, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('StarsPlanets', null, {});
        await queryInterface.bulkDelete('Planets', null, {});
        await queryInterface.bulkDelete('Stars', null, {});
        await queryInterface.bulkDelete('Galaxies', null, {});
    }
};
