const { DataTypes, Sequelize } = require('sequelize');
const UserAuth = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'user_auth',
        {
            auth_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            auth_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            tableName: 'user_auth',
            freezeTableName: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};
module.exports = UserAuth;
