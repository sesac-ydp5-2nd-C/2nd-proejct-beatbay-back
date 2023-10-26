// const { UsedProduct, UsedAbility, sequelize } = require('../models');
// const Op = require('sequelize').Op;
const { productAll, abilityAll } = require('../utils/productUtil');

// 물품 거래
exports.tradeProduct = async (req, res) => {
    try {
        // Todo 1) 인기순, 최신순, 낮은 가격순, 높은 가격순을 각각 조건으로 받아와야 함
        // default : 최신순
        let variation = 'DESC'; // 내림차순
        let orderMethod = 'used_product.createdAt';
        // let orderMethod = 'used_product.like'; // 인기순 (좋아요 기준)
        // let orderMethod = 'used_product.price';
        // let variation = 'ASC'; // 오름차순

        // Todo 2) 카테고리 정수 별로 지정해야 함
        // default : [0 : 전체]
        let categoryNum = 0;
        let subCategoryNum = 0;

        // Todo 3) 검색어 조건 (제목, 글, 제목 + 글) 정해야 함
        // default : 전체
        let searchKeyword = '';

        const products = await productAll(variation, orderMethod, categoryNum, subCategoryNum, searchKeyword);
        
        res.send(products);
    } catch (err) {
        console.log(err);
    }
};

// 재능 거래
exports.tradeAbility = async (req, res) => {
    try {
        // Todo 1) 인기순, 최신순, 낮은 가격순, 높은 가격순을 각각 조건으로 받아와야 함
        // default : 최신순
        let variation = 'DESC'; // 내림차순
        let orderMethod = 'used_ability.createdAt';
        // let orderMethod = 'used_ability.like'; // 인기순 (좋아요 기준)
        // let orderMethod = 'used_ability.price';
        // let variation = 'ASC'; // 오름차순

        // Todo 2) 카테고리 정수 별로 지정해야 함
        // default : [0 : 전체]
        let categoryNum = 0;
        let subCategoryNum = 0;

        // Todo 3) 검색어 조건 (제목, 글, 제목 + 글) 정해야 함
        // default : 전체
        let searchKeyword = '';

        let abilities = await abilityAll(variation, orderMethod, categoryNum, subCategoryNum, searchKeyword);
        
        res.send(abilities);
    } catch (err) {
        console.log(err);
    }
};

// 상세 거래
exports.tradeDetail = async (req, res) => {
    try {
        // Todo 1) 물품, 재능 페이지에서 각각 상세 페이지로 넘어올 경우 둘의 차이를 어떻게 받을지 정해야 함 - 리더님께 물어보기

        let id = 1;

        const product = await UsedProduct.findOne({
            attributes: [
                'id',
                'title',
                'content',
                'price',
                'file_path',
                'count',
                'like',
                'location',
                'status',
                'category',
                'sub_category',
                [
                    sequelize.fn(
                        'YEAR',
                        sequelize.col('used_product.createdAt')
                    ),
                    'year',
                ],
                [
                    sequelize.fn(
                        'MONTH',
                        sequelize.col('used_product.createdAt')
                    ),
                    'month',
                ],
                [
                    sequelize.fn(
                        'DAY',
                        sequelize.col('used_product.createdAt')
                    ),
                    'day',
                ], // 생성일자 로딩 시, 년,월,일을 각각 받아올 수 있도록
                // 'createdAt',
                'updatedAt',
                'user_id',
                'auth_id',
            ],
            where: id,
        });

        res.send(product);
    } catch (err) {
        console.log(err);
    }
};

// 판매 거래
exports.tradeSell = async (req, res) => {
    try {
        res.send('trade sell');
    } catch (err) {
        console.log(err);
    }
};
