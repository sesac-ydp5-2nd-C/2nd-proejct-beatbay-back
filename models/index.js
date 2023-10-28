'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

// 모델 모듈 불러오기
const User = require('./User')(sequelize, Sequelize);
const UserAuth = require('./UserAuth')(sequelize, Sequelize);
const UsedProduct = require('./UsedProduct')(sequelize, Sequelize);
const UsedAbility = require('./UsedAbility')(sequelize, Sequelize);
const ProductFavorite = require('./ProductFavorite')(sequelize, Sequelize);
const AbilityFavorite = require('./AbilityFavorite')(sequelize, Sequelize);

// 유저 > 유저권한 외래키
UserAuth.hasOne(User, {
    foreignKey: 'auth_id',
    sourceKey: 'auth_id',
});

// User : UsedProduct = 1 : N
User.hasMany(UsedProduct, { foreignKey: 'user_id', targetKey: 'user_id' });
UsedProduct.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

// User : UsedAbility = 1 : N
User.hasMany(UsedAbility, { foreignKey: 'user_id', targetKey: 'user_id' });
UsedAbility.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

// UserAuth : UsedProduct = 1 : N
UserAuth.hasMany(UsedProduct, { foreignKey: 'auth_id', targetKey: 'auth_id' });
UsedProduct.belongsTo(UserAuth, {
    foreignKey: 'auth_id',
    targetKey: 'auth_id',
});

// UserAuth : UsedAbility = 1 : N
UserAuth.hasMany(UsedAbility, { foreignKey: 'auth_id', targetKey: 'auth_id' });
UsedAbility.belongsTo(UserAuth, {
    foreignKey: 'auth_id',
    targetKey: 'auth_id',
});

// User : ProductFavorite = 1 : N
User.hasMany(ProductFavorite, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ProductFavorite.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
});

// UsedProduct : ProductFavorite = 1 : N
UsedProduct.hasMany(ProductFavorite, {
    foreignKey: 'product_id',
    targetKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// User : AbilityFavorite = 1 : N
User.hasMany(AbilityFavorite, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
AbilityFavorite.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
});

// UsedAbility : AbilityFavorite = 1 : N
UsedAbility.hasMany(AbilityFavorite, {
    foreignKey: 'ability_id',
    targetKey: 'ability_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// 모델 db 객체에 저장
db.User = User;
db.UserAuth = UserAuth;
db.UsedProduct = UsedProduct;
db.UsedAbility = UsedAbility;
db.ProductFavorite = ProductFavorite;
db.AbilityFavorite = AbilityFavorite;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
