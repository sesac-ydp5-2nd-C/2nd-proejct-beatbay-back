const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

router.get('/', controller.getUser); // 유저 목록 조회

router.post('/signup', controller.signupUser); // 회원가입 폼 전송
router.post('/idExists', controller.idCheck); // 아이디 확인

router.post('/login', controller.userLogin); // 로그인
router.get('/logout', controller.userLogout); // 로그아웃

router.post('/certification', controller.emailCertification); // 이메일 인증메일 발송
router.post('/emailCodeCheck', controller.emailCheck); // 전송된 번호 확인

router.get('/findPass', controller.getFindPass); // 비밀번호 찾기 화면
router.put('/findPass', controller.postFindPass); // 비밀번호 찾기 기능

module.exports = router;
