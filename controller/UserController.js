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
    // 이메일이 아닌 아이디 필터링을 위한 정규식
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    // 비밀번호 규칙 8자 이상 특수문자와 영어 대소문자를 포함한 정규식
    const passwordPattern =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    try {
        const { userId, userPw, userNickname } = req.body;
        if (!emailPattern.test(userId)) {
            return res.status(400).send({
                result: false,
                message: '올바른 이메일이 아닙니다.',
            });
        } else if (!passwordPattern.test(userPw)) {
            return res.status(400).send({
                result: false,
                message:
                    '비밀번호는 최소 8자리 이상이어야 하며, 특수문자(@#$%^&+=!)와 영문자, 숫자를 모두 포함해야 합니다.',
            });
        }

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
        console.log('회원가입 오류 :', err);
        res.status(500).send({
            result: false,
            message: '오류가 발생했습니다.',
        });
    }
};

// 로그인
exports.userLogin = async (req, res) => {
    try {
        const { userId, userPw } = req.body;
        const login = await User.findOne({
            where: { user_id: userId },
        });
        console.log('로그인 유저정보 : ', login);
        if (login) {
            if (compareFunc(userPw, login.user_pw) === true) {
                req.session.userInfo = {
                    id: login.id,
                    userId: login.user_id,
                    userNickname: login.user_nickname,
                    userGrade: login.user_grade,
                    authId: login.authId,
                    userProfileImg: login.user_profile_img,
                    userFallow: login.user_fallow,
                    userInterest: login.user_interest,
                };
                const logUserData = req.session.userInfo;
                console.log(true);
                res.send({ result: true, logUserData });
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
        // 로그아웃 요청 세션 삭제
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/'); // 로그아웃 후 홈으로 이동
        });
        console.log('로그아웃 성공.');
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
