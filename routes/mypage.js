const express = require('express');
const router = express.Router();
const controller = require('../controller/MypageController');
const chat = require('../controller/ChatController');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드 이미지 설정
const uploadImg = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            const date = new Date();
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            // 월과 일이 2자리가 아닌 경우, 0을 붙여줌
            if (month < 10) month = '0' + month;
            if (day < 10) day = '0' + day;

            const isExist = fs.existsSync(
                `uploads/${year}${month}${day}_profile`
            ); // uploads/YYYYMMDD 폴더가 있는지 확인
            const folderName = path.join(
                `uploads/${year}${month}${day}_profile`,
                '/'
            ); // 폴더명은 'uploads/YYYYMMDD'의 형식

            if (!isExist) {
                // 만약 YYYYMMDD 폴더가 존재하지 않으면 폴더를 새로 생성
                fs.mkdirSync(folderName, { recursive: true });
            }

            callback(null, folderName); // 이미지 업로드 폴더 경로 설정
        },
        filename(req, file, callback) {
            file.originalname = Buffer.from(
                file.originalname,
                'latin1'
            ).toString('utf8'); // 한글 처리 // 로컬에서는 주석 풀고 실행해야함
            const random = Math.trunc(Math.random() * Math.pow(10, 15)); // 임의의 15자리 숫자를 가지고 온다.
            const ext = path.extname(file.originalname); // 확장자 추출
            fileName = path.basename(file.originalname, ext) + random + ext; // 파일명
            // Ex) apple.png → apple40195724.png
            callback(null, fileName); // 업로드할 이미지의 파일명 설정
        },
    }),
    limits: {
        fileSize: 50 * 1024 * 1024, // 파일 최대 사이즈 : 50MB
    },
});

// 마이페이지 메인
router.get('/', controller.mypageMain);

// 메인 - 리뷰
router.get('/mainReview', controller.mypageReview);

// 메인 - 팔로워
router.get('/mainFollower', controller.mypageFollower);

// 메인 - 팔로잉
router.get('/mainFollowing', controller.mypageFollowing);

// 마이페이지 판매
router.get('/sell', controller.mypageSell);

// 마이페이지 구매
router.get('/buy', controller.mypageBuy);

// 마이페이지 찜
router.get('/like', controller.mypageLike);

// 마이페이지 채팅
router.get('/chat', chat.userChat);
// router.post('/chat/:productId/:roomId', chat.postChat);

// 리뷰 작성
router.post('/review', controller.postReview);

// 마이페이지 회원정보 수정
router.put(
    '/updateUser',
    uploadImg.single('uploadFiles'),
    controller.updateUser
);

router.delete('/deleteUser', controller.deleteUser); // 회원탈퇴

module.exports = router;
