const express = require('express');
const router = express.Router();
const controller = require('../controller/IndexController');

// 메인 화면
router.get('/', controller.index);

router.get('/test', (req, res) => {
    console.log('?:', res.locals);
    res.send(req.session);
});

module.exports = router;
