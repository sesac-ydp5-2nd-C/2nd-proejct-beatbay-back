const express = require('express');
const router = express.Router();
const controller = require('../controller/MypageController');

// 마이페이지 메인
router.get('/', controller.mypageMain);

// 마이페이지 판매
router.get('/sell', controller.mypageSell);

// 마이페이지 구매
router.get('/buy', controller.mypageBuy);

// 마이페이지 찜
router.get('/like', controller.mypageLike);

// 마이페이지 채팅

// 마이페이지 회원 정보 수정
router.patch('/updateUser', controller.mypageUpdate);

// 마이페이지 회원 정보 삭제
router.delete('/deleteUser', controller.mypageDelete);

module.exports = router;
