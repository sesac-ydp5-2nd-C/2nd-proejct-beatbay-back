async function getData(model, idField, value) {
    const data = await model.findAll({
        where: { [idField]: value },
    });
    return data;
}

async function getCount(model, idField, value) {
    const count = await model.count({
        where: { [idField]: value },
    });
    return count;
}

module.exports = { getData, getCount };
