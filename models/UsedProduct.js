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
                comment:
                    '상품 상태(0: 최상, 1: 상, 2: 중상, 3: 중하, 4: 하, 5: 최하)',
            },
            product_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '제품 대분류(0: 전체, 1: 악기, 2: 음반)',
            },
            product_sub_category: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment:
                    '제품 중분류(악기일 경우 -> 0: 전체, 1: 관악기, 2: 현악기, 3: 타악기, 4: 건반악기, 5: 전자악기, 6: 앰프/스피커, 7: 악기용품, 8: 기타, 음반일 경우 -> 0: 전체, 1: CD, 2: DVD, 3: LP, 4: 기타)',
            },
            product_method: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment:
                    '제품 거래 방식(0: 직거래, 1: 비대면거래, 2: 둘 다 가능)',
            },
            product_update: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment:
                    '물품 거래 상태(0: 전체, 1: 판매 중, 2: 예약 중, 3: 거래 완료)',
            },
            product_customer_id: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '제품 구매자 ID',
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
