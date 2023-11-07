const { DataTypes } = require('sequelize');

const User = (sequelize) => {
    const model = sequelize.define(
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
                default: 0,
                comment: '유저 등급',
            },
            auth_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default: 0,
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
            user_interest: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '유저 관심분야',
            },
            is_kakao: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
                comment: '카카오 유저 확인',
            },
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};
module.exports = User;
