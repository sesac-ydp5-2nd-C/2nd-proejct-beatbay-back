const { productAll, abilityAll } = require('../utils/tradeAll');
const { productOne, abilityOne } = require('../utils/tradeDetail');
const { productCreate, abilityCreate } = require('../utils/sellCreate');
const { checkFiles } = require('../utils/fileUtil');
const { productUpdate, abilityUpdate } = require('../utils/sellUpdate');
const CountFunc = require('../utils/myPageUitls');

const {
    UsedProduct,
    UsedAbility,
    ProductFavorite,
    AbilityFavorite,
    sequelize,
    Follow,
} = require('../models');
const Op = require('sequelize').Op;

// 물품 거래
exports.tradeProduct = async (req, res) => {
    try {
        let { orderMethod, categoryNum, subCategoryNum, searchKeyword, page } =
            req.query;

        orderMethod = parseInt(orderMethod);
        categoryNum = parseInt(categoryNum);
        subCategoryNum = parseInt(subCategoryNum);

        let variation = 'DESC'; // 내림차순, 오름차순 - default : 내림차순
        let order; // 정렬
        if (orderMethod === 0) {
            // 최신순
            order = 'used_product.createdAt';
        } else if (orderMethod === 1) {
            // 조회수 순
            order = 'used_product.product_count';
        } else if (orderMethod === 2) {
            // 낮은 가격순
            order = 'used_product.product_price';
            variation = 'ASC';
        } else if (orderMethod === 3) {
            // 높은 가격순
            order = 'used_product.product_price';
        }

        let products = await productAll(
            variation,
            order,
            categoryNum,
            subCategoryNum,
            searchKeyword,
            page
        );

        res.send({ products: products });
    } catch (err) {
        console.log(err);
    }
};

// 재능 거래
exports.tradeAbility = async (req, res) => {
    try {
        let { orderMethod, categoryNum, subCategoryNum, searchKeyword, page } =
            req.query;

        orderMethod = parseInt(orderMethod);
        categoryNum = parseInt(categoryNum);
        subCategoryNum = parseInt(subCategoryNum);

        let variation = 'DESC'; // 내림차순, 오름차순 - default : 내림차순
        let order; // 정렬
        if (orderMethod === 0) {
            // 최신순
            order = 'used_ability.createdAt';
        } else if (orderMethod === 1) {
            // 조회수 순
            order = 'used_ability.ability_count';
        } else if (orderMethod === 2) {
            // 낮은 가격순
            order = 'used_ability.ability_price';
            variation = 'ASC';
        } else if (orderMethod === 3) {
            // 높은 가격순
            order = 'used_ability.ability_price';
        }

        let abilities = await abilityAll(
            variation,
            order,
            categoryNum,
            subCategoryNum,
            searchKeyword,
            page
        );

        res.send({ abilities: abilities });
    } catch (err) {
        console.log(err);
    }
};

// 물품 상세 거래
exports.tradeDetailProduct = async (req, res) => {
    try {
        let { product_id } = req.query;
        product_id = parseInt(product_id);
        let isLike = 0; // 좋아요 여부
        let isFollow = 0; // 팔로우 여부

        // 조회수 증가
        await UsedProduct.increment(
            { product_count: 1 },
            { where: { product_id: product_id } }
        );

        // 좋아요 갯수
        let likeCount = await CountFunc.getCount(
            ProductFavorite,
            'product_id',
            product_id
        );

        let product = await productOne(product_id);

        // 좋아요 여부 isLike에 넣어서 알려주기, 팔로우 여부 isFollow에 넣어서 알려주기
        const data = req.session.userInfo;
        if (data) {
            let likeStatus = await ProductFavorite.findOne({
                where: { product_id, user_id: data.id },
            });

            let followStatus = await Follow.findOne({
                where: { follower_id: data.id, following_id: product.user_id },
            });

            if (likeStatus) {
                isLike = 1;
            }
            if (followStatus) {
                isFollow = 1;
            }
        }

        if (product) {
            res.send({ product: product, isLike, likeCount, isFollow });
        } else {
            res.status(404).send({ error: '존재하지 않는 물품입니다.' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 물품 좋아요
exports.likeProduct = async (req, res) => {
    try {
        const { product_id } = req.body;
        const { id } = req.session.userInfo;

        const status = await ProductFavorite.findOne({
            where: { product_id, user_id: id },
        });

        if (status) {
            await ProductFavorite.destroy({
                where: { product_id, user_id: id },
            });

            res.send({ like: 'cancel' });
        } else {
            const productLike = await ProductFavorite.create({
                user_id: id,
                product_id: product_id,
            });

            res.send({ productLike, like: 'success' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 재능 상세 거래
exports.tradeDetailAbility = async (req, res) => {
    try {
        let { ability_id } = req.query;
        ability_id = parseInt(ability_id);
        let isLike = 0; // 좋아요 여부
        let isFollow = 0;

        // 조회수 증가
        await UsedAbility.increment(
            { ability_count: 1 },
            { where: { ability_id: ability_id } }
        );

        // 좋아요 갯수
        let likeCount = await CountFunc.getCount(
            AbilityFavorite,
            'ability_id',
            ability_id
        );

        let ability = await abilityOne(ability_id);

        // 좋아요 여부 isLike에 넣어서 알려주기, 팔로우 여부 isFollow에 넣어서 알려주기
        const data = req.session.userInfo;
        if (data) {
            let status = await AbilityFavorite.findOne({
                where: { ability_id, user_id: data.id },
            });

            let followStatus = await Follow.findOne({
                where: { follower_id: data.id, following_id: ability.user_id },
            });

            if (status) {
                isLike = 1;
            }
            if (followStatus) {
                isFollow = 1;
            }
        }

        if (ability) {
            res.send({ ability: ability, isLike, likeCount, isFollow });
        } else {
            res.status(404).send({ error: '존재하지 않는 재능입니다.' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 재능 좋아요
exports.likeAbility = async (req, res) => {
    try {
        const { ability_id } = req.body;
        const { id } = req.session.userInfo;

        const status = await AbilityFavorite.findOne({
            where: { ability_id, user_id: id },
        });

        if (status) {
            await AbilityFavorite.destroy({
                where: { ability_id, user_id: id },
            });

            res.send({ like: 'cancel' });
        } else {
            const abilityLike = await AbilityFavorite.create({
                user_id: id,
                ability_id: ability_id,
            });

            res.send({ abilityLike, like: 'success' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 거래 수정
exports.update = async (req, res) => {
    try {
        // 파일 유무 확인
        // const filePaths = checkFile(req.files);

        // 제목, 카테고리(대, 중), 가격, 설명, 상태, 거래 방식, 지역
        const {
            type,
            title,
            category,
            subcategory,
            price,
            content,
            status,
            method,
            location,
            update,
            id,
        } = req.body;

        if (type == 0) {
            const product_id = parseInt(id);
            const updateProduct = await productUpdate(
                title,
                category,
                subcategory,
                price,
                content,
                status,
                method,
                location,
                update,
                // filePaths,
                product_id
            );

            res.send({ product: updateProduct, update: 'success' });
        } else if (type == 1) {
            const ability_id = parseInt(id);

            const updateAbility = await abilityUpdate(
                title,
                category,
                subcategory,
                price,
                content,
                status,
                method,
                location,
                update,
                // filePaths,
                ability_id
            );

            res.send({ ability: updateAbility, update: 'success' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 거래 상태 수정
exports.updateStatus = async (req, res) => {
    try {
        const { type, update, id } = req.body;

        if (type == 0) {
            await UsedProduct.update(
                {
                    product_update: update,
                },
                {
                    where: { product_id: id },
                }
            );

            res.send({ update: 'product_update change success' });
        } else if (type == 1) {
            await UsedAbility.update(
                {
                    ability_update: update,
                },
                {
                    where: { ability_id: id },
                }
            );

            res.send({ update: 'ability_update change success' });
        }

        res.send('updateStatus');
    } catch (err) {
        console.log(err);
    }
};

// 물품 삭제
exports.productDelete = async (req, res) => {
    try {
        const { product_id } = req.query;

        await UsedProduct.destroy({
            where: { product_id },
        });

        res.send({ delete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 재능 삭제
exports.abilityDelete = async (req, res) => {
    try {
        const { ability_id } = req.query;

        await UsedAbility.destroy({
            where: { ability_id },
        });

        res.send({ delete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 판매 거래 등록하기
exports.postTrade = async (req, res) => {
    try {
        // 파일 유무 확인
        const filePaths = checkFiles(req.files);

        // type : 물품 / 재능
        // 제목, 카테고리(대, 중), 가격, 설명, 상태, 거래 방식, 지역
        const {
            type,
            title,
            category,
            subcategory,
            price,
            content,
            status,
            method,
            location,
            update,
        } = req.body;

        const { id } = req.session.userInfo;

        if (type == 0) {
            let product = await productCreate(
                title,
                category,
                subcategory,
                price,
                content,
                status,
                method,
                location,
                update,
                filePaths,
                id
            );

            res.send({ product: product, upload: 'success' });
        } else if (type == 1) {
            let ability = await abilityCreate(
                title,
                category,
                subcategory,
                price,
                content,
                status,
                method,
                location,
                update,
                filePaths,
                id
            );

            res.send({ ability: ability, upload: 'success' });
        }
    } catch (err) {
        console.log(err);
    }
};
