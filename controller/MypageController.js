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
const { checkFile } = require('../utils/fileUtil');

// 마이페이지 메인
exports.mypageMain = async (req, res) => {
    // const data = req.headers.Authorization; // 이거로 바뀔거임..

    const data = req.session.userInfo;

    console.log('마이페이지에 로그인된 유저', data);
    try {
        if (data) {
            const user = await User.findOne({
                where: { user_id: data.userId },
            });

            // 상품
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

            // 후기
            const reviewCount = await userData.getCount(
                Review,
                'seller_id',
                data.id
            );

            // 팔로워
            const followerCount = await userData.getCount(
                Follow,
                'following_id',
                data.id
            );

            // 팔로잉
            const followingCount = await userData.getCount(
                Follow,
                'follower_id',
                data.id
            );

            res.status(200).send({
                result: 'mypage main',
                sessionId: data.sessionId,
                userData: user,
                itemCount: itemCount,
                reviewCount: reviewCount,
                followerCount: followerCount,
                followingCount: followingCount,
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

// 메인 - 리뷰
exports.mypageReview = async (req, res) => {
    try {
        const data = req.session.userInfo;

        const review = await Review.findAll({
            where: { seller_id: data.id },
            include: { model: User, as: 'Buyer' },
        });

        res.send({ review: review });
    } catch (err) {
        console.log(err);
    }
};

// 메인 - 팔로워
exports.mypageFollower = async (req, res) => {
    try {
        const data = req.session.userInfo;

        const follower = await Follow.findAll({
            where: { following_id: data.id },
            include: { model: User, as: 'Follower' },
        });

        res.send({ follower: follower });
    } catch (err) {
        console.log(err);
    }
};

// 메인 - 팔로잉
exports.mypageFollowing = async (req, res) => {
    try {
        const data = req.session.userInfo;

        const following = await Follow.findAll({
            where: { follower_id: data.id },
            include: { model: User, as: 'Following' },
        });

        res.send({ following: following });
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 판매
exports.mypageSell = async (req, res) => {
    try {
        const data = req.session.userInfo;
        let { type } = req.query;

        const user = await User.findOne({
            where: { user_id: data.userId },
        });

        if (data) {
            if (type == 0) {
                let { update, page } = req.query;

                update = parseInt(update);

                let userProduct = await productAll(
                    'DESC', // 내림차순
                    'used_product.createdAt', // 최신순
                    0, // 전체 대분류
                    0, // 전체 소분류
                    '', // 검색어 없음
                    page,
                    update,
                    data.id
                );

                res.status(200).send({
                    result: 'mypage sell',
                    userData: user,
                    userProduct: userProduct,
                });
            } else if (type == 1) {
                let { update, page } = req.query;

                update = parseInt(update);

                let userAbility = await abilityAll(
                    'DESC', // 내림차순
                    'used_ability.createdAt', // 최신순
                    0, // 전체 대분류
                    0, // 전체 소분류
                    '', // 검색어 없음
                    page,
                    update,
                    data.id
                );

                res.status(200).send({
                    result: 'mypage sell',
                    userData: user,
                    userAbility: userAbility,
                });
            }
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
        const data = req.session.userInfo;
        let { type } = req.query;

        const user = await User.findOne({
            where: { user_id: data.userId },
        });

        if (data) {
            if (type == 0) {
                let { page } = req.query;

                update = parseInt(update);

                let userProduct = await productAll(
                    'DESC', // 내림차순
                    'used_product.createdAt', // 최신순
                    0, // 전체 대분류
                    0, // 전체 소분류
                    '', // 검색어 없음
                    page,
                    0,
                    0,
                    data.id
                );

                res.status(200).send({
                    result: 'mypage buy',
                    userData: user,
                    userProduct: userProduct,
                });
            } else if (type == 1) {
                let { update, page } = req.query;

                let userAbility = await abilityAll(
                    'DESC', // 내림차순
                    'used_ability.createdAt', // 최신순
                    0, // 전체 대분류
                    0, // 전체 소분류
                    '', // 검색어 없음
                    page,
                    0,
                    0,
                    data.id
                );

                res.status(200).send({
                    result: 'mypage buy',
                    userData: user,
                    userAbility: userAbility,
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 찜
exports.mypageLike = async (req, res) => {
    try {
        const data = req.session.userInfo;
        let { type, update, page } = req.query;
        const whereCondition = {};
        const perPage = 15; // 페이지 당 항목 수

        const user = await User.findOne({
            where: { user_id: data.userId },
        });

        if (data) {
            if (type == 0) {
                let pageNum = page || 1;

                if (update > 0) {
                    whereCondition.product_update = update;
                }

                const productFavorite = await ProductFavorite.findAll({
                    where: { user_id: data.id },
                    include: {
                        model: UsedProduct,
                        where: whereCondition,
                    },
                    offset: (pageNum - 1) * perPage,
                    limit: perPage,
                });

                let totalItemCount = await ProductFavorite.count({
                    where: { user_id: data.id },
                    include: {
                        model: UsedProduct,
                        where: whereCondition,
                    },
                });

                let totalPages = Math.ceil(totalItemCount / perPage);

                res.status(200).send({
                    result: 'mypage like',
                    userData: user,
                    pageNum,
                    totalPages,
                    userFavoriteProduct: productFavorite,
                });
            } else if (type == 1) {
                let pageNum = page || 1;

                if (update > 0) {
                    whereCondition.product_update = update;
                }

                const abilityFavorite = await AbilityFavorite.findAll({
                    where: { user_id: data.id },
                    include: {
                        model: UsedAbility,
                        where: whereCondition,
                    },
                    offset: (pageNum - 1) * perPage,
                    limit: perPage,
                });

                let totalItemCount = AbilityFavorite.count({
                    where: { user_id: data.id },
                    include: {
                        model: UsedAbility,
                        where: whereCondition,
                    },
                });
                let totalPages = Math.ceil(totalItemCount / perPage);

                res.status(200).send({
                    result: 'mypage like',
                    userData: user,
                    pageNum,
                    totalPages,
                    userFavoriteAbility: abilityFavorite,
                });
            }
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
// 리뷰 작성
exports.postReview = async (req, res) => {
    try {
        const buyer_id = req.session.userInfo.id;
        const { review_content, seller_id, type, id } = req.body;

        const dealEnd = 3;

        const review = await Review.create({
            seller_id,
            buyer_id,
            review_content,
        });

        // customer_id 추가, 거래 상태 변경
        if (type == 0) {
            await UsedProduct.update(
                {
                    product_customer_id: buyer_id,
                    product_update: dealEnd,
                },
                { where: { product_id: id } }
            );

            res.send({ review, addId: 'product' });
        } else if (type == 1) {
            await UsedAbility.update(
                {
                    ability_customer_id: buyer_id,
                    ability_update: dealEnd,
                },
                { where: { ability_id: id } }
            );

            res.send({ review, addId: 'ability' });
        }
    } catch (err) {
        console.log(err);
    }
};

// 마이페이지 회원 정보 수정 요청
exports.updateUser = async (req, res) => {
    const data = req.body;
    console.log('data : ', data);
    try {
        const filePath = checkFile(req.file);
        console.log(req.file);

        const updateUser = await User.update(
            {
                user_nickname: data.userNickname,
                user_comment: data.userComment,
                user_interest: data.userInterest,
                user_profile_img: filePath,
            },
            {
                where: { user_id: data.userId },
            }
        );
        console.log('???: ', updateUser);
        if (updateUser > 0) {
            res.status(200).send({
                result: true,
                message: '회원정보 수정 성공',
            });
        } else {
            res.status(400).send({
                result: false,
                massage: '잘못된 접근 입니다.',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            result: false,
            message: '서버 에러',
        });
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
