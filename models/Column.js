const { DataTypes } = require('sequelize');
const Column = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'column',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            column_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            column_content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            column_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'column',
            freezeTableName: true,
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = Column;
