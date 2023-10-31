const express = require('express');
const router = express.Router();
const controller = require('../controller/KakaoController');

router.get('/', controller.kakaoLogin);
router.get('/callback', controller.kakaoCallback);
router.get('/logout', controller.kakaoLogout);

module.exports = router;
