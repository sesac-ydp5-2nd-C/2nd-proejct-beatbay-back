const {
    User,
    UsedProduct,
    UsedAbility,
    ProductFavorite,
    AbilityFavorite,
    Review,
    Follow,
} = require('../models');
const userData = require('../utils/myPageUitls');
const { productAll, abilityAll } = require('../utils/tradeAll');

// 판매자 메인
exports.sellerMain = async (req, res) => {
    try {
        const { seller_id, type } = req.query; // 판매자 계정 id(pri), product/ability
        let isFollow = false; // 팔로우 여부

        // 회원 정보
        const user = await User.findOne({
            where: { id: seller_id },
        });

        // 리뷰 수
        const reviewCount = await userData.getCount(
            Review,
            'seller_id',
            seller_id
        );

        // 팔로워 수
        const followerCount = await userData.getCount(
            Follow,
            'following_id',
            seller_id
        );

        // 팔로우 여부
        // default는 false로, 로그인하고 팔로우했을 경우만 true
        if (req.session.userInfo) {
            const status = await Follow.findOne({
                where: {
                    follower_id: req.session.userInfo.id,
                    following_id: seller_id,
                },
            });

            if (status) {
                isFollow = true;
            }
        }

        // default value
        const variation = 'DESC';
        let order;
        const categoryNum = 0;
        const subCategoryNum = 0;
        const searchKeyword = '';
        const page = 1;
        const update = 0;

        if (type == 0) {
            order = 'used_product.createdAt';

            const products = await productAll(
                variation,
                order,
                categoryNum,
                subCategoryNum,
                searchKeyword,
                page,
                update,
                seller_id
            );

            res.send({ reviewCount, followerCount, isFollow, user, products });
        } else if (type == 1) {
            order = 'used_ability.createdAt';

            const abilities = await abilityAll(
                variation,
                order,
                categoryNum,
                subCategoryNum,
                searchKeyword,
                page,
                update,
                seller_id
            );

            res.send({ reviewCount, followerCount, isFollow, user, abilities });
        }
    } catch (err) {
        console.log(err);
    }
};

// 팔로우
exports.follow = async (req, res) => {
    try {
        const { id } = req.session.userInfo; // 팔로우를 누르는 사람
        const { following_id } = req.body; // 팔로우 상대

        const status = await Follow.findOne({
            where: {
                follower_id: id,
                following_id,
            },
        });

        if (status) {
            await Follow.destroy({
                where: {
                    follower_id: id,
                    following_id,
                },
            });

            res.send({ isFollow: 'cancel' });
        } else {
            const follow = await Follow.create({
                follower_id: id,
                following_id,
            });

            res.send({ follow, isFollow: 'success' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 팔로우 목록
exports.follower = async (req, res) => {
    try {
        const { seller_id } = req.query;

        const follower = await Follow.findAll({
            where: { following_id: seller_id },
            include: { model: User, as: 'Follower' },
        });

        res.send({ follower });
    } catch (err) {
        console.log(err);
    }
};

// 판매자 리뷰
exports.review = async (req, res) => {
    try {
        const { id } = req.query;

        const review = await Review.findAll({
            where: { seller_id: id },
            include: { model: User, as: 'Buyer' },
        });

        res.send({ review });
    } catch (err) {
        console.log(err);
    }
};
