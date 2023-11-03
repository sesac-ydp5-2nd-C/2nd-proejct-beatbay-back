const { UsedProduct, UsedAbility, User, sequelize } = require('../models');
const Op = require('sequelize').Op;

const productOne = async (product_id) => {
    const product = await UsedProduct.findOne({
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
            'product_method',
            'product_update',
            'product_customer_id',
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
            'user.user_id',
            'user.auth_id',
        ],
        where: product_id,
        include: [{ model: User }],
    });

    return product;
};

const abilityOne = async (ability_id) => {
    const ability = await UsedAbility.findOne({
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
            'ability_method',
            'ability_update',
            'ability_customer_id',
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
            'user.user_id',
            'user.auth_id',
        ],
        where: ability_id,
        include: [{ model: User }],
    });

    return ability;
};

module.exports = { productOne, abilityOne };
