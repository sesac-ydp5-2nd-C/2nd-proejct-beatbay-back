const { User, Sequelize } = require('../models');
const bcrypt = require('bcrypt');

// 유저 목록
exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        console.log(err);
    }
};

// 회원가입 페이지 로드
exports.getSignup = async (req, res) => {
    try {
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

exports.updateUser = async (req, res) => {
    try {
    } catch {}
};

exports.deleteUser = async (req, res) => {
    const deleteUser = await User.destroy({
        where: { user_id: req.body.userId },
    });
    if (deleteUser) {
        res.send(true);
        return;
    } else {
        res.send(false);
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
