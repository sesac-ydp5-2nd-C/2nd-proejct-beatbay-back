// 물품 거래
exports.tradeProduct = async (req, res) => {
    try {
        res.send('trade product');
    } catch (err) {
        console.log(err);
    }
};

// 재능 거래
exports.tradeAbility = async (req, res) => {
    try {
        res.send('trade ability');
    } catch (err) {
        console.log(err);
    }
};

// 상세 거래
exports.tradeDetail = async (req, res) => {
    try {
        res.send('trade detail');
    } catch (err) {
        console.log(err);
    }
};

// 판매 거래
exports.tradeSell = async (req, res) => {
    try {
        res.send('trade sell');
    } catch (err) {
        console.log(err);
    }
};
