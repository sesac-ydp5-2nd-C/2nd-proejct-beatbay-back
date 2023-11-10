exports.userChat = (req, res) => {
    const { userInfo } = req.session;
    try {
    } catch (err) {
        console.log(err);
        res.status(500).send({ result: false, message: '서버 에러' });
    }
};
