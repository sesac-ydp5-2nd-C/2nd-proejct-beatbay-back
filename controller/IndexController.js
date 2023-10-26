// main 화면
exports.index = async (req, res) => {
    try {
        console.log('session info : ', req.session);
        res.send(req.session.userInfo);
    } catch (err) {
        console.log(err);
    }
};
