exports.seller = async (req, res) => {
    try {
        res.send('seller page');
    } catch (err) {
        console.log(err);
    }
};
