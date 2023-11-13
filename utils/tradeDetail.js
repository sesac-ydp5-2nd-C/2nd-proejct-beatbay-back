const { UsedProduct, UsedAbility, User, sequelize } = require('../models');
const Op = require('sequelize').Op;

const productOne = async (product_id) => {
    const product = await UsedProduct.findOne({
        where: product_id,
        include: { model: User },
    });

    return product;
};

const abilityOne = async (ability_id) => {
    const ability = await UsedAbility.findOne({
        where: ability_id,
        include: [{ model: User }],
    });

    return ability;
};

module.exports = { productOne, abilityOne };
