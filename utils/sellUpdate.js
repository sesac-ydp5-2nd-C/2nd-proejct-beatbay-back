const { UsedProduct, UsedAbility, sequelize } = require('../models');

const productUpdate = async (
    title,
    category,
    subcategory,
    price,
    content,
    status,
    method,
    location,
    update,
    file_paths,
    product_id
) => {
    const product = await UsedProduct.update(
        {
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
        },
        {
            where: {
                product_id: product_id,
            },
        }
    );

    return product;
};

const abilityUpdate = async (
    title,
    category,
    subcategory,
    price,
    content,
    status,
    method,
    location,
    update,
    file_paths,
    ability_id
) => {
    const ability = await UsedAbility.update(
        {
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
        },
        {
            where: {
                ability_id: ability_id,
            },
        }
    );

    return ability;
};

module.exports = { productUpdate, abilityUpdate };
