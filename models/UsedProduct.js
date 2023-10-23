const UsedProduct = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        'used_product',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            filePath: {
                type: DataTypes.STRING,
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            like: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'used_product',
            freezeTableName: true,
            timestamps: true,
        }
    );
    return model;
};

module.exports = UsedProduct;
