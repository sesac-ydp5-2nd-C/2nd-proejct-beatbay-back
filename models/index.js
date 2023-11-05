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
const Follow = require('./Follow')(sequelize, Sequelize);
const Review = require('./Review')(sequelize, Sequelize);
const ChatRoom = require('./ChatRoom')(sequelize, Sequelize);
const ChatMessage = require('./ChatMessage')(sequelize, Sequelize);

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

// User : Follow = N : M
// 같은 테이블끼리 다대다 관계 -> as로 구별 (JS 객체에서 사용할 이름)
User.belongsToMany(User, {
    through: Follow,
    as: 'Followings',
    foreignKey: 'follower_id', // DB 컬럼명: 반대로 쓰는 이유는 foreignKey가 남의 테이블 id를 가리키기 때문
});
User.belongsToMany(User, {
    through: Follow,
    as: 'Followers',
    foreignKey: 'following_id',
});

// User: Review = N : M
User.belongsToMany(User, {
    through: Review,
    as: 'Reviewings',
    foreignKey: 'seller_id',
});
User.belongsToMany(User, {
    through: Review,
    as: 'Reviewers',
    foreignKey: 'buyer_id',
});

// ChatRoom : ChatMessage = 1 : N
// ChatRoom.hasMany(ChatMessage, {
//     foreignKey: 'chat_room_id',
//     targetKey: 'chat_room_id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// UsedAbility : ChatRoom = 1 : N
// UsedAbility.hasMany(ChatRoom, {
//     foreignKey: 'pro_abil_id',
//     targetKey: 'ability_id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// // UsedProduct : ChatRoom = 1 : N
// UsedProduct.hasMany(ChatRoom, {
//     foreignKey: 'pro_abil_id',
//     targetKey: 'product_id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// User : ChatRoom = N : M
// User.belongsTo(ChatRoom, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });

// 모델 db 객체에 저장
db.User = User;
db.UserAuth = UserAuth;
db.UsedProduct = UsedProduct;
db.UsedAbility = UsedAbility;
db.ProductFavorite = ProductFavorite;
db.AbilityFavorite = AbilityFavorite;
db.Follow = Follow;
db.Review = Review;
db.ChatRoom = ChatRoom;
db.ChatMessage = ChatMessage;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
