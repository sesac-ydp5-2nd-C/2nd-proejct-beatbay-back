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

        // 로그인이 완료되면 원하는 페이지로 리다이렉트
        res.send(req.session.userData);
    } catch (err) {
        console.log('kakao login error !! : ', err);
    }
};

exports.kakaoLogout = async (req, res) => {
    try {
    } catch (err) {
        console.log('error : ', err);
    }
};
