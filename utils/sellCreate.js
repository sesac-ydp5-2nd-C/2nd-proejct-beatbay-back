const { UsedProduct, UsedAbility, sequelize } = require('../models');

const productCreate = async (
    title,
    category,
    subcategory,
    price,
    content,
    status,
    method,
    location,
    update,
    file_paths
) => {
    const product = await UsedProduct.create({
        product_title: title,
        product_category: category,
        product_sub_category: subcategory,
        product_content: content,
        product_price: price,
        product_location: location,
        product_status: status,
        product_method: method,
        product_update: update,
        product_file_path: file_paths,
    });

    return product;
};

const abilityCreate = async (
    title,
    category,
    subcategory,
    price,
    content,
    status,
    method,
    location,
    update,
    file_paths
) => {
    const ability = await UsedAbility.create({
        ability_title: title,
        ability_category: category,
        ability_sub_category: subcategory,
        ability_content: content,
        ability_price: price,
        ability_location: location,
        ability_status: status,
        ability_method: method,
        ability_update: update,
        ability_file_path: file_paths,
    });

    return ability;
};

module.exports = { productCreate, abilityCreate };
