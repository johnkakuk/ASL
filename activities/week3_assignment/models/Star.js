const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('development', 'asl', 'asl', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = (sequelize, DataTypes) => {
    class Star extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Star.belongsTo(models.Galaxy)
            Star.hasMany(models.Planet)
        }
    }

    Star.init(
        {
            // Model attributes
            starName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            starSize: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            starDescription: {
                type: DataTypes.TEXT,
            },
            starImageURL: {
                type: DataTypes.TEXT,
            },
        },
        {
            // Other model options
            sequelize, // Pass the connection instance as per Sequelize docs
            modelName: 'Star', // Choose the model name
            timestamps: false,
        });

    return Star;
};
