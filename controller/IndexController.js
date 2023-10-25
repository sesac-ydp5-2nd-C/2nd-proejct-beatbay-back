// main 화면
exports.index = async (req, res) => {
    try {
        res.send('main');
    } catch (err) {
        console.log(err);
    }
};
