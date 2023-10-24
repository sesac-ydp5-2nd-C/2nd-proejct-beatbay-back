const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

router.get('/user', controller.getUser); // 유저 목록 조회

router.get('/signup', controller.getSignup); // 회원가입 페이지 로드
router.post('/signup', controller.signupUser); // 회원가입 폼 전송
router.post('/myPage/updateUser', controller.updateUser); // 회원정보 수정
router.delete('/myPage/deleteUser', controller.deleteUser); // 회원탈퇴

module.exports = router;
