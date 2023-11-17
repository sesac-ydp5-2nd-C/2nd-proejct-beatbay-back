const express = require('express');
const router = express.Router();
const controller = require('../controller/AdminController');

// 관리자 메인
router.get('/', controller.adminMain);

// 등급 변경
router.patch('/grade', controller.gradeChange);

// 회원 삭제
router.delete('/userDelete', controller.userDelete);

// 공지사항 등록
router.post('/notice', controller.noticePost);

// 공지사항 삭제
router.delete('/deleteNotice', controller.deleteNotice);

// 공지사항 수정
router.patch('/updateNotice', controller.updateNotice);

// 칼럼 등록
router.post('/column', controller.columnPost);

// 칼럼 삭제
router.delete('/deleteColumn', controller.deleteColumn);

// 칼럼 수정
router.patch('/updateColumn', controller.updateColumn);

// 물품 삭제
router.delete('/productDelete', controller.productDelete);

// 재능 삭제
router.delete('/abilityDelete', controller.abilityDelete);

module.exports = router;
