const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('development', 'asl', 'asl', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = (sequelize, DataTypes) => {
    class Planet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Planet.belongsToMany(models.Star, { through: 'StarsPlanets' }) // Sequelize will auto-generate a join table
        }
    }

    Planet.init(
        {
            // Model attributes
            planetName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            planetSize: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            planetDescription: {
                type: DataTypes.TEXT,
            },
            planetImageURL: {
                type: DataTypes.TEXT,
            },
        },
        {
            // Other model options
            sequelize, // Pass the connection instance as per Sequelize docs
            modelName: 'Planet', // Choose the model name
            timestamps: false,
        });

    return Planet;
};
