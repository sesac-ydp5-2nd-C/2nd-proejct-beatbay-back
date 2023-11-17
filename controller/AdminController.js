const { User, UsedProduct, UsedAbility, Notice, Column } = require('../models');

// 관리자 메인
exports.adminMain = async (req, res) => {
    try {
        // 회원 관리
        const users = await User.findAll({
            attributes: ['id', 'user_id', 'user_nickname', 'user_grade'],
        });
        const userCount = await User.count();

        // 칼럼 관리
        const columns = await Column.findAll();

        // 공지 관리
        const notices = await Notice.findAll();

        // 물품 관리
        const products = await UsedProduct.findAll({
            attributes: ['product_id', 'product_title'],
        });
        const productCount = await UsedProduct.count();

        // 재능 관리
        const abilities = await UsedAbility.findAll({
            attributes: ['ability_id', 'ability_title'],
        });
        const abilityCount = await UsedAbility.count();

        res.send({
            users,
            userCount,
            notices,
            columns,
            products,
            productCount,
            abilities,
            abilityCount,
        });
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

// 회원 삭제
exports.userDelete = async (req, res) => {
    try {
        const { user_id } = req.query;

        await User.destroy({ where: { id: user_id } });

        res.send({ userDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 공지사항 등록
exports.noticePost = async (req, res) => {
    try {
        const { notice_title, notice_content } = req.body;

        let notice = await Notice.create({
            notice_title,
            notice_content,
        });

        res.send(notice);
    } catch (err) {
        console.log(err);
    }
};

// 공지사항 삭제
exports.deleteNotice = async (req, res) => {
    try {
        const { notice_id } = req.query;

        await Notice.destroy({ where: { id: notice_id } });

        res.send({ noticeDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 공지사항 수정
exports.updateNotice = async (req, res) => {
    try {
        const { notice_id, notice_title, notice_content } = req.body;

        let notice = await Notice.update(
            {
                notice_title,
                notice_content,
            },
            {
                where: { id: notice_id },
            }
        );

        res.send({ notice, update: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 칼럼 등록
exports.columnPost = async (req, res) => {
    try {
        const { column_title, column_content } = req.body;

        let column = await Column.create({
            column_title,
            column_content,
        });

        res.send(column);
    } catch (err) {
        console.log(err);
    }
};

// 칼럼 삭제
exports.deleteColumn = async (req, res) => {
    try {
        const { column_id } = req.query;

        await Column.destroy({ where: { id: column_id } });

        res.send({ columnDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 칼럼 수정
exports.updateColumn = async (req, res) => {
    try {
        const { column_id, column_title, column_content } = req.body;

        let column = await Column.update(
            {
                column_title,
                column_content,
            },
            {
                where: { id: column_id },
            }
        );

        res.send({ column, update: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 물품 삭제
exports.productDelete = async (req, res) => {
    try {
        const { product_id } = req.query;

        await UsedProduct.destroy({ where: { product_id } });

        res.send({ productDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};

// 재능 삭제
exports.abilityDelete = async (req, res) => {
    try {
        const { ability_id } = req.query;

        await UsedAbility.destroy({ where: { ability_id } });

        res.send({ abilityDelete: 'success' });
    } catch (err) {
        console.log(err);
    }
};
