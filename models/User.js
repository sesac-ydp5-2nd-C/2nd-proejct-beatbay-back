const { DataTypes, Sequelize } = require('sequelize');
const User = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                comment: '유저 pri 키',
            },
            user_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '유저 ID',
            },
            user_pw: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '유저 PW',
            },
            user_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                comment: '유저 이름',
            },
            user_grade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '유저 등급',
            },
            auth_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '유저 권한',
            },
            user_profile_img: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: '유저 프로필 이미지',
            },
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};
module.exports = User;
