const { DataTypes } = require('sequelize');
const AbilityFavorite = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'ability_favorite',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ability_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'ability_favorite',
            freezeTableName: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = AbilityFavorite;
