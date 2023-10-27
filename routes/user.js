const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

router.get('/', controller.getUser); // 유저 목록 조회

router.get('/signup', controller.getSignup); // 회원가입 페이지 로드
router.post('/signup', controller.signupUser); // 회원가입 폼 전송

router.post('/login', controller.userLogin); // 로그인
router.post('/logout', controller.userLogout); // 로그아웃

router.post('/certification', controller.emailCertification); // 이메일 인증

module.exports = router;
