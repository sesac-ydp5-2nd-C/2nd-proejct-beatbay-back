const express = require('express');
const router = express.Router();
const controller = require('../controller/SellerController');

router.get('/', controller.seller);

module.exports = router;
