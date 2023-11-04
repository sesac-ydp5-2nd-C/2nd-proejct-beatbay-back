const {
    User,
    UsedProduct,
    UsedAbility,
    ProductFavorite,
    AbilityFavorite,
} = require('../models');
const userData = require('../utils/myPageUitls');

// 마이페이지 메인
exports.mypageMain = async (req, res) => {
    // const data = req.headers.Authorization; // 이거로 바뀔거임..

    const data = req.session.userInfo;
    console.log('!@@!$#!#@#@ ', data);
    console.log('마이페이지에 로그인된 유저', data);
    try {
        if (data) {
            const user = await User.findOne({
                where: { user_id: data.userId },
            });

            const productCount = await userData.getCount(
                UsedProduct,
                'user_id',
                data.id
            );
            const abilityCount = await userData.getCount(
                UsedAbility,
                'user_id',
                data.id
            );
            const itemCount = productCount + abilityCount;

            res.status(200).send({
                result: 'mypage main',
                sessionId: data.sessionId,
                userData: user,
                itemCount: itemCount,
            });
        } else {
            res.status(400).send({
                result: false,
                massage: '잘못된 접근 입니다.',
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 판매
exports.mypageSell = async (req, res) => {
    const data = req.session.userInfo;
    try {
        if (data) {
            const userProduct = await userData.getData(
                UsedProduct,
                'user_id',
                data.id
            );
            const userAbility = await userData.getData(
                UsedAbility,
                'user_id',
                data.id
            );
            res.status(200).send({
                result: 'mypage sell',
                userProduct: userProduct,
                userAbility: userAbility,
            });
        } else {
            res.status(400).send({
                result: false,
                massage: '잘못된 접근 입니다.',
            });
        }
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
    const data = req.session.userInfo;
    try {
        if (data) {
            const productFavorite = await userData.getData(
                ProductFavorite,
                'user_id',
                data.id
            );
            const abilityFavorite = await userData.getData(
                AbilityFavorite,
                'user_id',
                data.id
            );
            res.status(200).send({
                result: 'mypage like',
                userFavoriteProduct: productFavorite,
                userFavoriteAbility: abilityFavorite,
            });
        } else {
            res.status(400).send({
                result: false,
                massage: '잘못된 접근 입니다.',
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 채팅

// 마이페이지 회원 정보 수정
exports.updateUser = async (req, res) => {
    const data = req.body;
    console.log('data : ', data);
    try {
        const updateUser = await User.update(
            {
                user_comment: data.userComment,
                user_following: data.userFollowing,
                user_interest: data.userInterest,
            },
            {
                where: { user_id: data.userId },
            }
        );
        if (updateUser) {
            res.status(200)({ result: true, message: '회원정보 수정 성공' });
        } else {
            res.status(400).send({
                result: false,
                massage: '잘못된 접근 입니다.',
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 회원 정보 삭제
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: { user_id: req.body.userId },
        });
        if (deleteUser) {
            res.status(200).send({
                result: true,
                message: '회원 정보 삭제 성공',
            });
        } else {
            res.status(400).send({
                result: false,
                massage: '잘못된 접근 입니다.',
            });
        }
    } catch (err) {
        console.log(err);
    }
};
