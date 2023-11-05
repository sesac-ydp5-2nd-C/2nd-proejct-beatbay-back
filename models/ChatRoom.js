const { DataTypes, Sequelize } = require('sequelize');
const ChatRoom = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'chat_room',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            pro_abil_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            pro_abil_img: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id_1: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id_2: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'chat_room',
            freezeTableName: true,
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = ChatRoom;
