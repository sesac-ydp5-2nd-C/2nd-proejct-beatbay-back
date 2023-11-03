const {
    User,
    UsedProduct,
    UsedAbility,
    ProductFavorite,
    AbilityFavorite,
} = require('../models');
const userData = require('../utils/myPageUitls');
const { productAll, abilityAll } = require('../utils/tradeAll');

exports.seller = async (req, res) => {
    try {
        const { user_id, type } = req.body; // 판매자 id, product/ability

        const user = await User.findOne({
            where: { user_id: user_id },
        });

        // 리뷰

        // default value
        const variation = 'DESC';
        let order;
        const categoryNum = 0;
        const subCategoryNum = 0;
        const searchKeyword = '';
        const page = 1;

        if (type === '0') {
            order = 'used_product.createdAt';

            const products = await productAll(
                variation,
                order,
                categoryNum,
                subCategoryNum,
                searchKeyword,
                page
            );
        } else if (type === '1') {
            order = 'used_ability.createdAt';

            const abilityies = await abilityAll(
                variation,
                order,
                categoryNum,
                subCategoryNum,
                searchKeyword,
                page
            );
        }
    } catch (err) {
        console.log(err);
    }
};
