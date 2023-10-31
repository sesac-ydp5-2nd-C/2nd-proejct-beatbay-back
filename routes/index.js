const express = require('express');
const router = express.Router();
const controller = require('../controller/IndexController');

// 메인 화면
router.get('/', controller.index);

router.get('/test', (req, res) => {
    res.send(req.session);
});

module.exports = router;
