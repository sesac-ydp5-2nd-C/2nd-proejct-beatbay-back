const { User, UsedProduct, UsedAbility } = require('../models');
const getDataAndCount = require('../utils/myPageUitls');

// 마이페이지 메인
exports.mypageMain = async (req, res) => {
    const { id, userId } = req.session.userInfo;
    console.log('마이페이지에 로그인된 유저', userId);
    try {
        const user = await User.findOne({
            where: { user_id: userId },
        });
        const userProduct = await getDataAndCount(UsedProduct, 'user_id', id);
        const userAbility = await getDataAndCount(UsedAbility, 'user_id', id);
        const count = userProduct.count + userProduct.count;
        res.status(200).send({
            result: 'mypage main',
            userData: user,
            userProduct: userProduct,
            userAbility: userAbility,
            count: count,
        });
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
exports.updateUser = async (req, res) => {
    const { userId, userComment, userFallow, userInterest } = req.body;
    console.log('data : ', req.body);
    try {
        const updateUser = await User.update(
            {
                user_comment: userComment,
                user_fallow: userFallow,
                user_interest: userInterest,
            },
            {
                where: { user_id: userId },
            }
        );
        if (updateUser) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch {}
};

// 마이페이지 회원 정보 삭제
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
