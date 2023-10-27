async function getDataAndCount(model, idField, value) {
    const data = await model.findAll({
        where: { [idField]: value },
    });

    const count = await model.count({
        where: { [idField]: value },
    });

    return { data, count };
}

module.exports = getDataAndCount;
