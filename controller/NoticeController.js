const { Column, Notice, sequelize } = require('../models');

// 공지 사항
exports.notice = async (req, res) => {
    try {
        const notices = await Notice.findAll({
            order: [[sequelize.col('notice.createdAt'), 'DESC']],
        });

        res.send(notices);
    } catch (err) {
        console.log(err);
    }
};

// 칼럼
exports.column = async (req, res) => {
    try {
        const columns = await Column.findAll({
            order: [[sequelize.col('column.createdAt'), 'DESC']],
        });

        res.send(columns);
    } catch (err) {
        console.log(err);
    }
};
