const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const { sequelize } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// 메인
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 유저
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// 마이페이지
const mypageRouter = require('./routes/mypage');
app.use('/mypage', mypageRouter);

// 거래
const tradeRouter = require('./routes/trade');
app.use('/trade', tradeRouter);

// 칼럼/공지사항
const noticeRouter = require('./routes/notice');
app.use('/notice', noticeRouter);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
