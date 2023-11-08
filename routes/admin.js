const express = require('express');
const router = express.Router();
const controller = require('../controller/AdminController');

// 관리자 메인
router.get('/', controller.adminMain);

// 등급 변경
router.patch('/grade', controller.gradeChange);

// 회원 삭제
router.delete('/delete', controller.userDelete);

module.exports = router;
