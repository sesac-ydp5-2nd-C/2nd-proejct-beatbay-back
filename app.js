const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const PORT = 8000;
const cors = require('cors');
const { sequelize } = require('./models');
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// 세션 설정
app.use(
    session({
        name: 'session ID',
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 30 * 60 * 1000, // 30분동안 세션 유지
            name: 'user-session-cookie',
            signed: true, // 암호화 쿠키 사용
        },
    })
);
// 쿠키 암호화
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

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
