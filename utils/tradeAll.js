const {
    UsedProduct,
    UsedAbility,
    sequelize,
    ProductFavorite,
    User,
} = require('../models');
const Op = require('sequelize').Op;

const productAll = async (
    variation,
    order,
    categoryNum,
    subCategoryNum,
    searchKeyword,
    page,
    update,
    userId,
    customerId
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

    if (update > 0) {
        whereCondition.product_update = update;
    }

    if (userId > 0) {
        whereCondition.user_id = userId;
    }

    if (customerId > 0) {
        whereCondition.product_customer_id = customerId;
    }

    const products = await UsedProduct.findAll({
        order: [[sequelize.col(order), variation]],
        where: whereCondition, // 들어오는 카테고리 값에 따른 조건
        offset: (pageNum - 1) * perPage,
        limit: perPage,
    });

    const totalItemCount = await UsedProduct.count({
        order: [[sequelize.col(order), variation]],
        where: whereCondition,
    });

    let totalPages = Math.ceil(totalItemCount / perPage);

    return { products, pageNum, totalPages };
};

const abilityAll = async (
    variation,
    order,
    categoryNum,
    subCategoryNum,
    searchKeyword,
    page,
    update,
    userId,
    customerId
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

    if (update > 0) {
        whereCondition.ability_update = update;
    }

    if (userId > 0) {
        whereCondition.user_id = userId;
    }

    if (customerId > 0) {
        whereCondition.ability_customer_id = customerId;
    }

    const abilities = await UsedAbility.findAll({
        order: [[sequelize.col(order), variation]],
        where: whereCondition, // 들어오는 카테고리 값에 따른 조건
        offset: (pageNum - 1) * perPage,
        limit: perPage,
    });

    const totalItemCount = await UsedAbility.count({
        order: [[sequelize.col(order), variation]],
        where: whereCondition,
    });

    let totalPages = Math.ceil(totalItemCount / perPage);

    return { abilities, pageNum, totalPages };
};

module.exports = { productAll, abilityAll };
