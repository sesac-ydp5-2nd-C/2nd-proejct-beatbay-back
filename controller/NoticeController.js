// 공지사항
exports.noticeInform = async (req, res) => {
    try {
        res.send('notice inform');
    } catch (err) {
        console.log(err);
    }
};

// 칼럼
exports.noticeColumn = async (req, res) => {
    try {
        res.send('notice column');
    } catch (err) {
        console.log(err);
    }
};
