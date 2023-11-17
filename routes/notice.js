const express = require('express');
const router = express.Router();
const controller = require('../controller/NoticeController');

// 공지사항
router.get('/notice', controller.notice);

// 칼럼
router.get('/column', controller.column);

module.exports = router;
