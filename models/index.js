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

// 유저 > 유저권한 외래키
UserAuth.hasOne(User, {
    foreignKey: 'auth_id',
    sourceKey: 'auth_id',
});

// 모델 db 객체에 저장
db.User = User;
db.UserAuth = UserAuth;
db.UsedProduct = UsedProduct;
db.UsedAbility = UsedAbility;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
