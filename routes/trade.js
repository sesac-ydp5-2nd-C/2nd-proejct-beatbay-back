const express = require('express');
const router = express.Router();
const controller = require('../controller/TradeController');

// 물품 거래
router.get('/product', controller.tradeProduct);

// 재능 거래
router.get('/ability', controller.tradeAbility);

// 상세 거래
router.get('/detail', controller.tradeDetail);

// 판매 거래
router.get('/sell', controller.tradeSell);

module.exports = router;
