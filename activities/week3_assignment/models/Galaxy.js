const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('development', 'asl', 'asl', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = (sequelize, DataTypes) => {
    class Galaxy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Galaxy.hasMany(models.Star)
        }
    }

    Galaxy.init(
        {
            // Model attributes
            galaxyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            galaxySize: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            galaxyDescription: {
                type: DataTypes.TEXT,
            },
        },
        {
            // Other model options
            sequelize, // Pass the connection instance as per Sequelize docs
            modelName: 'Galaxy', // Choose the model name
            timestamps: false,
        });

    return Galaxy;
};
