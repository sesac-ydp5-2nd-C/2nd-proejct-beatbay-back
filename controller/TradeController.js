const { productAll, abilityAll } = require('../utils/tradeAll');
const { productOne, abilityOne } = require('../utils/tradeDetail');
const { productCreate, abilityCreate } = require('../utils/sellCreate');
const { checkFile } = require('../utils/fileUtil');
const { productUpdate, abilityUpdate } = require('../utils/sellUpdate');

// 함수화하면 필요 없음
const { UsedProduct, UsedAbility, sequelize } = require('../models');
const Op = require('sequelize').Op;

// const path = require('path');

// 물품 거래
exports.tradeProduct = async (req, res) => {
    try {
        console.log('>> 쿼리문 ', req.query);
        let { orderMethod, categoryNum, subCategoryNum, searchKeyword } =
            req.query;

        orderMethod = parseInt(orderMethod);
        categoryNum = parseInt(categoryNum);
        subCategoryNum = parseInt(subCategoryNum);
        // console.log('orderMethod >>> ', orderMethod);

        let variation = 'DESC'; // 내림차순, 오름차순 - default : 내림차순
        let order; // 정렬
        if (orderMethod === 0) {
            // 최신순
            order = 'used_product.createdAt';
        } else if (orderMethod === 1) {
            // 인기순
            order = 'used_product.like'; // 좋아요 기준
        } else if (orderMethod === 2) {
            // 낮은 가격순
            order = 'used_product.price';
        } else if (orderMethod === 3) {
            // 높은 가격순
            order = 'used_product.price';
            variation = 'ASC';
        }

        let products = await productAll(
            variation,
            order,
            categoryNum,
            subCategoryNum,
            searchKeyword
        );

        res.send({ products: products });
    } catch (err) {
        console.log(err);
    }
};

// 재능 거래
exports.tradeAbility = async (req, res) => {
    try {
        console.log('>> 쿼리문 ', req.query);
        let { orderMethod, categoryNum, subCategoryNum, searchKeyword } =
            req.query;

        orderMethod = parseInt(orderMethod);
        categoryNum = parseInt(categoryNum);
        subCategoryNum = parseInt(subCategoryNum);
        // console.log('orderMethod >>> ', orderMethod);

        let variation = 'DESC'; // 내림차순, 오름차순 - default : 내림차순
        let order; // 정렬
        if (orderMethod === 0) {
            // 최신순
            order = 'used_ability.createdAt';
        } else if (orderMethod === 1) {
            // 인기순
            order = 'used_ability.like'; // 좋아요 기준
        } else if (orderMethod === 2) {
            // 낮은 가격순
            order = 'used_ability.price';
        } else if (orderMethod === 3) {
            // 높은 가격순
            order = 'used_ability.price';
            variation = 'ASC';
        }

        let abilities = await abilityAll(
            variation,
            order,
            categoryNum,
            subCategoryNum,
            searchKeyword
        );

        res.send({ abilities: abilities });
    } catch (err) {
        console.log(err);
    }
};

// 물품 상세 거래
exports.tradeDetailProduct = async (req, res) => {
    try {
        let product_id = 1;

        let product = await productOne(product_id);

        res.send({ product: product });
    } catch (err) {
        console.log(err);
    }
};

// 재능 상세 거래
exports.tradeDetailAbility = async (req, res) => {
    try {
        let ability_id = 1;

        let ability = await abilityOne(ability_id);

        res.send({ ability: ability });
    } catch (err) {
        console.log(err);
    }
};

// 물품 거래 수정
exports.update = async (req, res) => {
    try {
        // 파일 유무 확인
        const filePaths = checkFile(req.files);

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
            id,
        } = req.body;

        // console.log('body >>>>>>>', req.body);

        if (type === '0') {
            // 물품
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
                filePaths,
                product_id
            );

            res.send({ product: updateProduct, update: 'success' });
        } else if (type == '1') {
            // 재능
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
                filePaths,
                ability_id
            );

            res.send({ ability: updateAbility, update: 'success' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 물품 삭제
exports.productDelete = async (req, res) => {
    try {
        let product_id = 1;

        const product = await UsedProduct.destroy({
            where: { product_id },
        });

        res.send('product delete');
    } catch (err) {
        console.log(err);
    }
};

// 재능 삭제
exports.abilityDelete = async (req, res) => {
    try {
        let ability_id = 1;

        const ability = await UsedAbility.destroy({
            where: { ability_id },
        });

        res.send('ability delete');
    } catch (err) {
        console.log(err);
    }
};

// 판매 거래 등록하기
exports.postTrade = async (req, res) => {
    console.log(req.files);
    try {
        // 파일 유무 확인
        const filePaths = checkFile(req.files);

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

        if (type === '0') {
            // 물품
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
                filePaths
            );

            res.send({ product: product, upload: 'success' });
            // console.log(product);
            // res.send(true);
        } else if (type === '1') {
            // 재능
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
                filePaths
            );

            // console.log(ability);
            res.send({ ability: ability, upload: 'success' });
            // res.send(true);
        }
    } catch (err) {
        console.log(err);
    }
};
