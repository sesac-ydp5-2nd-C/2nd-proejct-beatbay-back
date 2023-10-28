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

router.patch('/updateUser', controller.updateUser); // 회원정보 수정
router.delete('/deleteUser', controller.deleteUser); // 회원탈퇴

module.exports = router;
