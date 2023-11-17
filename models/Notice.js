const { DataTypes } = require('sequelize');
const Notice = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'notice',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            notice_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            notice_content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'notice',
            freezeTableName: true,
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = Notice;
