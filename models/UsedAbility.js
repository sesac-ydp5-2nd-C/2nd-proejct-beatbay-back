const { DataTypes, Sequelize } = require('sequelize');
const UsedAbility = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'used_ability',
        {
            ability_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                commet: '게시글 pri 키',
            },
            ability_title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '게시물 제목',
            },
            ability_content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '게시물 내용',
            },
            ability_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '거래 가격',
            },
            ability_file_path: {
                type: DataTypes.STRING,
                comment: '게시글 첨부파일',
            },
            ability_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '조회수',
            },
            ability_like: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '좋아요 수',
            },
            ability_location: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '거래 지역',
            },
            ability_status: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '상품 상태',
            },
            ability_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '재능 대분류',
            },
            ability_sub_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '재능 중분류',
            },
            ability_method: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '재능 거래 방식',
            },
            ability_update: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '재능 거래 상태(0: 거래 중, 1: 거래 종료)',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            tableName: 'used_ability',
            freezeTableName: true,
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = UsedAbility;
