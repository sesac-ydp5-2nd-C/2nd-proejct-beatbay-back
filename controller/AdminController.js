const { User } = require('../models');

// 관리자 메인
exports.adminMain = async (req, res) => {
    try {
        // 회원 관리
        // 관리자 등급 필요
        const users = await User.findAll({
            attributes: ['id', 'user_id', 'user_nickname', 'user_grade'],
        });
        const userCount = await User.count();

        res.send({ users, userCount });
    } catch (err) {
        console.log(err);
    }
};

// 등급 변경
exports.gradeChange = async (req, res) => {
    try {
        const { user_id, user_grade } = req.body;

        await User.update(
            {
                user_grade,
            },
            { where: { id: user_id } }
        );

        res.send({ review: 'success' });
    } catch (err) {
        console.log(err);
    }
};
