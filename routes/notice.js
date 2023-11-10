const express = require('express');
const router = express.Router();
const controller = require('../controller/NoticeController');

// 공지사항
router.get('/inform', controller.noticeInform);

// 칼럼
router.get('/column', controller.noticeColumn);

module.exports = router;
