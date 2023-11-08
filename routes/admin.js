const express = require('express');
const router = express.Router();
const controller = require('../controller/AdminController');

// 관리자 메인
router.get('/', controller.adminMain);

// 등급 변경
router.patch('/grade', controller.gradeChange);

// 회원 삭제
router.delete('/userDelete', controller.userDelete);

// 물품 삭제
router.delete('/productDelete', controller.productDelete);

// 재능 삭제
router.delete('/abilityDelete', controller.abilityDelete);

module.exports = router;
