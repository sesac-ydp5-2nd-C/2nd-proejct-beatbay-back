const { productAll, abilityAll } = require('../utils/tradeAll');
const { productOne, abilityOne } = require('../utils/tradeDetail');
const { productCreate, abilityCreate } = require('../utils/sellCreate');

// 함수화하면 필요 없음
const { UsedProduct, UsedAbility, sequelize } = require('../models');
const Op = require('sequelize').Op;

const path = require('path');

// 물품 거래
exports.tradeProduct = async (req, res) => {
    try {
        // Todo 1) 인기순, 최신순, 낮은 가격순, 높은 가격순을 각각 조건으로 받아와야 함
        // default : 최신순
        // let variation = 'DESC'; // 내림차순
        // let orderMethod = 'used_product.createdAt';
        // let orderMethod = 'used_product.like'; // 인기순 (좋아요 기준)
        // let orderMethod = 'used_product.price';
        // let variation = 'ASC'; // 오름차순

        // Todo 2) 카테고리 정수 별로 지정해야 함
        // default : [0 : 전체]
        // let categoryNum = 0;
        // let subCategoryNum = 0;

        // Todo 3) 검색어 조건 (제목, 글, 제목 + 글) 정해야 함
        // default : 전체
        // let searchKeyword = '';

        console.log('>> 123', req.query);
        let { orderMethod, categoryNum, subCategoryNum, searchKeyword } =
            req.query;

        if (orderMethod === 0) {
            // 최신순
            let variation = 'DESC';
        }

        let products = await productAll(
            variation,
            orderMethod,
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
        // Todo 1) 인기순, 최신순, 낮은 가격순, 높은 가격순을 각각 조건으로 받아와야 함
        // default : 최신순
        let variation = 'DESC'; // 내림차순
        let orderMethod = 'used_ability.createdAt';
        // let orderMethod = 'used_ability.like'; // 인기순 (좋아요 기준)
        // let orderMethod = 'used_ability.price';
        // let variation = 'ASC'; // 오름차순

        // Todo 2) 카테고리 정수 별로 지정해야 함
        // default : [0 : 전체]
        let categoryNum = 0;
        let subCategoryNum = 0;

        // Todo 3) 검색어 조건 (제목, 글, 제목 + 글) 정해야 함
        // default : 전체
        let searchKeyword = '';

        let abilities = await abilityAll(
            variation,
            orderMethod,
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
        let file_paths = [];
        let file_path = null;
        // 파일 정보 유무 확인
        if (req.files) {
            for (file of req.files) {
                const { destination, filename } = file;
                file_path =
                    destination.split(path.sep)[1] + path.sep + filename; // 파일명
                // console.log(file_path);
                file_paths.push(file_path);
            }
        }

        file_paths = JSON.stringify(file_paths);
        console.log(file_paths);

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
            // postman에서는 text, 실제로는 num
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
                file_paths
            );

            res.send({ product: product });
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
                file_paths
            );

            // console.log(ability);
            res.send({ ability: ability });
            // res.send(true);
        }
    } catch (err) {
        console.log(err);
    }
};
