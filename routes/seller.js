const express = require('express');
const router = express.Router();
const controller = require('../controller/SellerController');

// 판매자 메인
router.get('/', controller.sellerMain);

// 팔로우
router.patch('/follow', controller.follow);

// 팔로우 목록
router.get('/follower', controller.follower);

// 리뷰 목록
router.get('/sellerReview', controller.review);

module.exports = router;
