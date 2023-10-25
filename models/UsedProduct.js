const { DataTypes, Sequelize, fn } = require('sequelize');
const UsedProduct = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'used_product',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                commet: '게시글 pri 키',
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
            file_path: {
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
                comment: '제품 대분류',
            },
            sub_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '제품 중분류',
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
            tableName: 'used_product',
            freezeTableName: true,
            timestamps: true,
        }
    );
    return model;
};

module.exports = UsedProduct;
