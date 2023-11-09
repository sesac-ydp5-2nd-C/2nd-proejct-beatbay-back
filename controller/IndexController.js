// main 화면
exports.index = async (req, res) => {
    try {
        res.send({ result: true, loginUser: req.session.userInfo });
    } catch (err) {
        console.log(err);
    }
};
