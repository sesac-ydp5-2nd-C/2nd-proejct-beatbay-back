const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileStore = require('session-file-store')(session);
const dotenv = require('dotenv');
const app = express();
const http = require('http').createServer(app);
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
        store: new fileStore(),
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

// 세션 정보 헤더로 넘기는 미들웨어
app.use((req, res, next) => {
    res.locals.id = 0;
    res.locals.userId = '';
    res.locals.userNickname = '';
    res.locals.userGrade = 0;
    res.locals.authId = 0;
    res.locals.userProfileImg = '';
    res.locals.userFollow = 0;
    res.locals.userInterest = '';
    res.locals.isKakao = 0;
    if (req.session.userInfo) {
        const userInfo = req.session.userInfo;
        res.locals.sessinId = userInfo.sessionId;
        res.locals.id = userInfo.id;
        res.locals.userId = userInfo.userId;
        res.locals.userNickname = userInfo.userNickname;
        res.locals.userGrade = userInfo.userGrade;
        res.locals.authId = userInfo.authId;
        res.locals.userProfileImg = userInfo.userProfileImg;
        res.locals.userFollow = userInfo.userFollow;
        res.locals.userInterest = userInfo.userInterest;
        res.locals.isKakao = userInfo.isKakao;
    }
    next();
});

// 메인
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 유저
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// 카카오 로그인
const kakaoRouter = require('./routes/kakao');
app.use('/kakao', kakaoRouter);

// 마이페이지
const mypageRouter = require('./routes/mypage');
app.use('/mypage', mypageRouter);

// 거래
const tradeRouter = require('./routes/trade');
app.use('/trade', tradeRouter);

// 칼럼/공지사항
const noticeRouter = require('./routes/notice');
app.use('/notice', noticeRouter);

app.get('*', (req, res) => {
    res.send('404');
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});

http.listen(3000, () => {
    console.log('Connected at 3000');
});
