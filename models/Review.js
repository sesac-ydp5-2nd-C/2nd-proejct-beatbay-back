const { DataTypes } = require('sequelize');
const Review = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'review',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            seller_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '판매자 ID',
            },
            buyer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '구매자 ID',
            },
            review_content: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '리뷰 내용',
            },
        },
        {
            tableName: 'review',
            freezeTableName: true,
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = Review;
