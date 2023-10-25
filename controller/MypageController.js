const { User, UsedProduct, UsedAbility } = require('../models');

// 마이페이지 메인
exports.mypageMain = async (req, res) => {
    try {
        res.send('mypage main');
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 판매
exports.mypageSell = async (req, res) => {
    try {
        res.send('mypage sell');
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 구매
exports.mypageBuy = async (req, res) => {
    try {
        res.send('mypage buy');
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 찜
exports.mypageLike = async (req, res) => {
    try {
        res.send('mypage like');
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 채팅

// 마이페이지 회원 정보 수정
exports.mypageUpdate = async (req, res) => {
    try {
        res.send('mypage Update');
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 회원 정보 삭제
exports.mypageDelete = async (req, res) => {
    try {
        res.send('mypage delete');
    } catch (err) {
        console.log(err);
    }
};
