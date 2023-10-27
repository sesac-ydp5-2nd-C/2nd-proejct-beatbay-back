const express = require('express');
const router = express.Router();
const controller = require('../controller/TradeController');

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// 물품 거래
router.get('/product', controller.tradeProduct);

// 재능 거래
router.get('/ability', controller.tradeAbility);

// 물품 상세 거래
router.get('/detailProduct', controller.tradeDetailProduct);

// 재능 상세 거래
router.get('/detailAbility', controller.tradeDetailAbility);

// 물품 삭제
router.delete('/deleteProduct', controller.productDelete);

// 재능 삭제
router.delete('/deleteAbility', controller.abilityDelete);

// 판매 거래
router.get('/sell', controller.tradeSell);

module.exports = router;
