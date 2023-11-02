const { DataTypes } = require('sequelize');
const Follow = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'follow',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            follower_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            following_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'follow',
            freezeTableName: true,
            timestaps: false,
        }
    );
    return model;
};

module.exports = Follow;
