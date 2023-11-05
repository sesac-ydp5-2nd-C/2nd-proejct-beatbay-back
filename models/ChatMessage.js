const { DataTypes, Sequelize } = require('sequelize');
const ChatMessage = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'chat_message',
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            chat_room_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sender_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            receiver_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sent_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: 'chat_message',
            freezeTableName: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = ChatMessage;
