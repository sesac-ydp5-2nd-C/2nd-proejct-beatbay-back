const express = require('express');
const router = express.Router();
const controller = require('../controller/MypageController');
const chat = require('../controller/ChatController');

// 마이페이지 메인
router.get('/', controller.mypageMain);

// 메인 - 리뷰
router.get('/mainReview', controller.mypageReview);

// 메인 - 팔로워
router.get('/mainFollower', controller.mypageFollower);

// 메인 - 팔로잉
router.get('/mainFollowing', controller.mypageFollowing);

// 마이페이지 판매
router.get('/sell', controller.mypageSell);

// 마이페이지 구매
router.get('/buy', controller.mypageBuy);

// 마이페이지 찜
router.get('/like', controller.mypageLike);

// 마이페이지 채팅
router.get('/chat', chat.userChat);
// router.post('/chat/:productId/:roomId', chat.postChat);

// 리뷰 작성
router.post('/review', controller.postReview);

// 마이페이지 회원정보 수정
router.get('/userProfile', controller.userProfile); // 회원정보 수정 페이지
router.put('/updateUser', controller.updateUser); // 회원정보 수정 요청
router.delete('/deleteUser', controller.deleteUser); // 회원탈퇴

module.exports = router;
