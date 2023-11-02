const { User, Sequelize } = require('../models');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

exports.kakaoLogin = async (req, res) => {
    const clientID = process.env.KAKAO_KEY;
    const redirectURI = 'http://localhost:8000/kakao/callback';
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&response_type=code`;
    try {
        res.redirect(kakaoAuthURL);
    } catch (err) {
        console.log(err);
    }
};

exports.kakaoCallback = async (req, res) => {
    const { code } = req.query;
    console.log('code : ', code);
    // 카카오 OAuth 코드를 사용하여 액세스 토큰을 요청
    try {
        const authToken = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            {},
            {
                headers: {
                    'Content-type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                },
                params: {
                    grant_type: 'authorization_code',
                    client_id: process.env.KAKAO_KEY,
                    client_secret: process.env.KAKAO_SECRET_KEY,
                    redirect_uri: process.env.KAKAO_REDIRECT_URL,
                    code,
                },
            }
        );
        const accessToken = authToken.data.access_token;

        // 액세스 토큰을 사용하여 사용자 정보 가져오기
        const userResponse = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log('userResponse : ', userResponse);
        const userData = userResponse.data;

        // 사용자 정보를 세션에 저장
        req.session.userData = userData;
        req.session.token = accessToken;

        // 카카오 회원가입 로직
        const idExists = await User.findOne({
            where: { user_id: userData.kakao_account.email },
        });

        // 동일한 아이디(이메일)이 존재하면 해당 아이디 정보 업데이트
        let kakaoUser;
        if (idExists) {
            kakaoUser = await User.update(
                {
                    user_nickname: userData.properties.nickname,
                    user_profile_img: userData.properties.profile_image,
                    is_kakao: true,
                },
                {
                    where: { user_id: userData.kakao_account.email },
                }
            );
        } else {
            kakaoUser = await User.create({
                user_id: userData.kakao_account.email,
                user_pw: userData.kakao_account.email,
                user_nickname: userData.properties.nickname,
                user_grade: 0,
                auth_id: 0,
                user_profile_img: userData.properties.profile_image,
                is_kakao: true,
            });
        }

        if (kakaoUser) {
            res.status(200).send({
                result: true,
                message: '카카오 로그인 성공',
                data: req.session.userData,
            });
        } else {
            res.status(400).send({
                result: false,
                message: '카카오 로그인 실패',
            });
        }
        // 로그인이 완료되면 원하는 페이지로 리다이렉트 추후 추가
    } catch (err) {
        console.log('kakao login error !! : ', err);
    }
};

exports.kakaoLogout = async (req, res) => {
    try {
        req.session.userData = '';
        const token = req.session.token;

        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.post(
                'https://kapi.kakao.com/v1/user/logout',
                {},
                { headers }
            );

            if (response.status === 200) {
                req.session.destroy((err) => {
                    console.log('로그아웃: 세션 삭제 실패 :', err);
                    return;
                });
                return res.redirect('/');
            }
        }
        return res
            .status(400)
            .send({ result: false, message: '로그아웃 실패' });
    } catch (error) {
        console.error('에러 :', error);
        res.status(500).json('에러');
    }
};
