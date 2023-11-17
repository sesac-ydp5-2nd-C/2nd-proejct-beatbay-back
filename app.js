const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileStore = require('session-file-store')(session);
const dotenv = require('dotenv');
const app = express();
const io = require('./utils/io');
const PORT = 8000;
const cors = require('cors');
const HTTPS = require('https');
const fs = require('fs');
const { sequelize } = require('./models');
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

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
        sameSite: 'none',
        secure: true,
    })
);
// 쿠키 암호화

app.use('/uploads', express.static(__dirname + '/uploads'));

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
        res.locals.sessionId = userInfo.sessionId;
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

// 판매자 페이지
const sellerRouter = require('./routes/seller');
app.use('/seller', sellerRouter);

// 거래
const tradeRouter = require('./routes/trade');
app.use('/trade', tradeRouter);

// 칼럼/공지사항
const noticeRouter = require('./routes/notice');
app.use('/inform', noticeRouter);

// 관리자
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

app.get('*', (req, res) => {
    res.send('404');
});

sequelize.sync({ force: false }).then(() => {
    // 배포시 https로 배포
    if (process.env.IS_PRODUCTION === 'YES') {
        try {
            const option = {
                ca: fs.readFileSync(
                    `/etc/letsencrypt/live/${process.env.PRODUCTION_DOMAIN}/fullchain.pem`
                ),
                key: fs.readFileSync(
                    `/etc/letsencrypt/live/${process.env.PRODUCTION_DOMAIN}/privkey.pem`
                ),
                cert: fs.readFileSync(
                    `/etc/letsencrypt/live/${process.env.PRODUCTION_DOMAIN}/cert.pem`
                ),
            };

            HTTPS.createServer(option, app).listen(PORT, () => {
                console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + PORT);
            });
        } catch (error) {
            console.log('HTTPS 서버가 실행되지 않습니다.');
            console.log(error);
        }
    } else {
        app.listen(PORT, () => {
            console.log(`http:localhost:${PORT}`);
        });
    }
});
