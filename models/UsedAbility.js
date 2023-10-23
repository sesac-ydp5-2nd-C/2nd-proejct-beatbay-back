const { DataTypes, Sequelize } = require('sequelize');
const UsedAbility = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'used_ability',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                commet: '게시글 pri 키',
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                coment: '유저 ID',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '게시물 제목',
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '게시물 내용',
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '거래 가격',
            },
            filePath: {
                type: DataTypes.STRING,
                comment: '게시글 첨부파일',
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '조회수',
            },
            like: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '좋아요 수',
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '거래 지역',
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '거래 상태(0: 거래 중, 1: 거래 종료)',
            },
            category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '재능 분류 - 따로 table 존재',
            },
        },
        {
            tableName: 'used_ability',
            freezeTableName: true,
            timestamps: true,
        }
    );
    return model;
};

module.exports = UsedAbility;
