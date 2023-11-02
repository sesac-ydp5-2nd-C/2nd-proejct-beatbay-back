const { UsedProduct, UsedAbility, sequelize } = require('../models');
const Op = require('sequelize').Op;

const productAll = async (
    variation,
    orderMethod,
    categoryNum,
    subCategoryNum,
    searchKeyword,
    page
) => {
    const whereCondition = {};

    const pageNum = page || 1;
    const perPage = 15; // 페이지 당 항목 수

    if (categoryNum > 0) {
        whereCondition.product_category = categoryNum;
    }

    if (subCategoryNum > 0) {
        whereCondition.product_sub_category = subCategoryNum;
    }

    if (searchKeyword && searchKeyword.trim() !== '') {
        whereCondition[Op.or] = [
            {
                product_title: { [Op.like]: `%${searchKeyword}%` },
            },
            {
                product_content: { [Op.like]: `%${searchKeyword}%` },
            },
        ];
    }

    const products = await UsedProduct.findAll({
        attributes: [
            'product_id',
            'product_title',
            'product_content',
            'product_price',
            'product_file_path',
            'product_count',
            'product_like',
            'product_location',
            'product_status',
            'product_category',
            'product_sub_category',
            [
                sequelize.fn('YEAR', sequelize.col('used_product.createdAt')),
                'year',
            ],
            [
                sequelize.fn('MONTH', sequelize.col('used_product.createdAt')),
                'month',
            ],
            [
                sequelize.fn('DAY', sequelize.col('used_product.createdAt')),
                'day',
            ], // 생성일자 로딩 시, 년,월,일을 각각 받아올 수 있도록
            // 'createdAt',
            'updatedAt',
            'user_id',
            'auth_id',
        ],
        order: [[sequelize.col(orderMethod), variation]], // 최신 글 순으로 전달될 수 있도록 - 프론트에서 받아오는 조건에 따라 수정되어야 함
        where: whereCondition, // 들어오는 카테고리 값에 따른 조건
        offset: (pageNum - 1) * perPage,
        limit: perPage,
    });

    return products;
};

const abilityAll = async (
    variation,
    orderMethod,
    categoryNum,
    subCategoryNum,
    searchKeyword,
    page
) => {
    const whereCondition = {};

    const pageNum = page || 1;
    const perPage = 15; // 페이지 당 항목 수

    if (categoryNum > 0) {
        whereCondition.ability_category = categoryNum;
    }

    if (subCategoryNum > 0) {
        whereCondition.ability_sub_category = subCategoryNum;
    }

    if (searchKeyword && searchKeyword.trim() !== '') {
        whereCondition[Op.or] = [
            {
                ability_title: { [Op.like]: `%${searchKeyword}%` },
            },
            {
                ability_content: { [Op.like]: `%${searchKeyword}%` },
            },
        ];
    }

    const abilities = await UsedAbility.findAll({
        attributes: [
            'ability_id',
            'ability_title',
            'ability_content',
            'ability_price',
            'ability_file_path',
            'ability_count',
            'ability_like',
            'ability_location',
            'ability_status',
            'ability_category',
            'ability_sub_category',
            [
                sequelize.fn('YEAR', sequelize.col('used_ability.createdAt')),
                'year',
            ],
            [
                sequelize.fn('MONTH', sequelize.col('used_ability.createdAt')),
                'month',
            ],
            [
                sequelize.fn('DAY', sequelize.col('used_ability.createdAt')),
                'day',
            ], // 생성일자 로딩 시, 년,월,일을 각각 받아올 수 있도록
            // 'createdAt',
            'updatedAt',
            'user_id',
            'auth_id',
        ],
        order: [[sequelize.col(orderMethod), variation]], // 최신 글 순으로 전달될 수 있도록 - 프론트에서 받아오는 조건에 따라 수정되어야 함
        where: whereCondition, // 들어오는 카테고리 값에 따른 조건
        offset: (pageNum - 1) * perPage,
        limit: perPage,
    });

    return abilities;
};

module.exports = { productAll, abilityAll };
