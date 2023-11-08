const express = require('express');
const router = express.Router();
const controller = require('../controller/AdminController');

// 관리자 메인
router.get('/', controller.adminMain);

// 등급 변경
router.patch('/grade', controller.gradeChange);

module.exports = router;
