const { User, UsedProduct, UsedAbility } = require('../models');

// 관리자 메인
exports.adminMain = async (req, res) => {
    try {
        // 회원 관리
        // 관리자 등급 필요
        const users = await User.findAll({
            attributes: ['id', 'user_id', 'user_nickname', 'user_grade'],
        });
        const userCount = await User.count();

        // 물품 관리
        const products = await UsedProduct.findAll({
            attributes: ['product_id', 'product_title'],
        });
        const productCount = await UsedProduct.count();

        // 재능 관리
        const abilities = await UsedAbility.findAll({
            attributes: ['ability_id', 'ability_title'],
        });
        const abilityCount = await UsedAbility.count();

        res.send({
            users,
            userCount,
            products,
            productCount,
            abilities,
            abilityCount,
        });
    } catch (err) {
        console.log(err);
    }
};

// 등급 변경
exports.gradeChange = async (req, res) => {
    try {
        const { user_id, user_grade } = req.body;

        await User.update(
            {
                user_grade,
            },
            { where: { id: user_id } }
        );

        res.send({ review: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 회원 삭제
exports.userDelete = async (req, res) => {
    try {
        const { user_id } = req.query;

        await User.destroy({ where: { id: user_id } });

        res.send({ userDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 물품 삭제
exports.productDelete = async (req, res) => {
    try {
        const { product_id } = req.query;

        await UsedProduct.destroy({ where: { product_id } });

        res.send({ productDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 재능 삭제
exports.abilityDelete = async (req, res) => {
    try {
        const { ability_id } = req.query;

        await UsedAbility.destroy({ where: { ability_id } });

        res.send({ abilityDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};
