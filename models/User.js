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
                type: DataTypes.STRING,
                allowNull: false,
                comment: '유저 ID',
            },
            user_pw: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '유저 PW',
            },
            user_nickname: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '유저 닉네임',
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
                type: DataTypes.STRING,
                allowNull: true,
                comment: '유저 프로필 이미지',
            },
            user_comment: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '자기소개',
            },
            user_fallow: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '유저 팔로우 수',
            },
            user_interest: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '유저 관심분야',
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
