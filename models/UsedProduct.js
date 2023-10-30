const { DataTypes, Sequelize, fn } = require('sequelize');
const UsedProduct = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'used_product',
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                commet: '게시글 pri 키',
            },
            product_title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '게시물 제목',
            },
            product_content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '게시물 내용',
            },
            product_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '거래 가격',
            },
            product_file_path: {
                type: DataTypes.JSON,
                comment: '게시글 첨부파일',
            },
            product_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '조회수',
            },
            product_like: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '좋아요 수',
            },
            product_location: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '거래 지역',
            },
            product_status: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '상품 상태',
            },
            product_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '제품 대분류',
            },
            product_sub_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '제품 중분류',
            },
            product_method: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '제품 거래 방식',
            },
            product_update: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '물품 거래 상태(0: 거래 중, 1: 거래 종료)',
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
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = UsedProduct;
