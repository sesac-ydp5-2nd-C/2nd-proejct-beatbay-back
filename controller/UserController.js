const { User, Sequelize } = require('../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { emailUtil } = require('../utils/emailUtil');
dotenv.config();

// 유저 목록
exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
        console.log(process.env.EMAIL_ADDRESS);
    } catch (err) {
        console.log(err);
    }
};

// 회원가입 페이지 로드
exports.getSignup = async (req, res) => {
    try {
        res.send('회원가입 페이지');
    } catch (err) {
        console.log(err);
    }
};

// 회원가입
exports.signupUser = async (req, res) => {
    try {
        const { userId, userPw, userNickname } = req.body;
        pw = bcryptPassword(userPw);
        const signupUser = await User.create({
            user_id: userId,
            user_pw: pw,
            user_nickname: userNickname,
            user_grade: 0, // 유저 등급 데이터 의견 조율 후 수정
            auth_id: 0, // 유저 권한 데이터 의견 조율 후 수정
        });
        res.send(signupUser);
        console.log('result : ', signupUser);
    } catch (err) {
        console.log(err);
    }
};

// 로그인
exports.userLogin = async (req, res) => {
    try {
        const { userId, userPw } = req.body;
        const login = await User.findOne({
            where: { user_id: userId },
        });
        if (login) {
            if (compareFunc(userPw, login.user_pw) === true) {
                console.log(true);
            } else {
                console.log(false);
            }
        } else if (!userId) {
            console.log('아이디를 입력하세요.');
        } else {
            console.log('아이디를 확인하세요');
        }
    } catch (err) {
        console.log(err);
    }
};

// 로그아웃
exports.userLogout = async (req, res) => {
    try {
    } catch (err) {
        console.log(err);
    }
};

exports.emailCertification = async (req, res) => {
    try {
        const { email } = req.body;
        const message = `<p>회원가입을 위한 인증번호입니다.</p>`;

        const authCode = await emailUtil.sendEmail(email, message);
        res.status(200).send(true);
        console.log(authCode);
    } catch (err) {
        console.log(err);
    }
};

// 비밀번호 암호화 함수
const saltRounds = 5;
function bcryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compareFunc(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}
