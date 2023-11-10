const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const mail = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: true,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APPPASS,
    },
});

const emailUtil = {
    sendEmail: async (email, message) => {
        const number = randomNumber();
        await mail.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: `Beatbay 인증 메일 입니다.`,
            html:
                message +
                `<p>아래의 인증번호를 입력하여 인증을 완료해주세요.</p>` +
                `<b style="font-size:25px; color:blue;">${number}</b>`,
        });
        return number;
    },
};

// 6자리 숫자를 생성
function randomNumber() {
    const min = 100000; // 6자리 숫자의 최소값
    const max = 999999; // 6자리 숫자의 최대값
    const random = crypto.randomInt(min, max); // 범위 내에서 난수 생성
    return random;
}

module.exports = { emailUtil };
