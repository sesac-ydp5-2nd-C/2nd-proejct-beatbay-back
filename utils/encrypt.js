const bcrypt = require('bcrypt');

// 비밀번호 암호화 함수
const saltRounds = 5;

function bcryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compareFunc(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { bcryptPassword, compareFunc };
