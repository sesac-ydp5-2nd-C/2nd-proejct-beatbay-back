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
const User = require('./User')(sequelize);
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
User.belongsTo(UserAuth, { foreignKey: 'auth_id', targetKey: 'auth_id' });

// User : UsedProduct = 1 : N
User.hasMany(UsedProduct, { foreignKey: 'user_id', sourceKey: 'id' });
UsedProduct.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

// User : UsedAbility = 1 : N
User.hasMany(UsedAbility, { foreignKey: 'user_id', sourceKey: 'id' });
UsedAbility.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

// User : ProductFavorite = 1 : N
User.hasMany(ProductFavorite, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ProductFavorite.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});

// UsedProduct : ProductFavorite = 1 : N
UsedProduct.hasMany(ProductFavorite, {
    foreignKey: 'product_id',
    sourceKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ProductFavorite.belongsTo(UsedProduct, {
    foreignKey: 'product_id',
    targetKey: 'product_id',
});

// User : AbilityFavorite = 1 : N
User.hasMany(AbilityFavorite, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
AbilityFavorite.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
});

// UsedAbility : AbilityFavorite = N : M
UsedAbility.belongsToMany(UsedAbility, {
    through: AbilityFavorite,
    as: 'like',
    foreignKey: 'ability_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
UsedAbility.belongsToMany(UsedAbility, {
    through: AbilityFavorite,
    as: 'liked',
    foreignKey: 'ability_id',
});

// UsedAbility.belongsToMany(UsedAbility, {
//     through: AbilityFavorite,
//     as: 'like',
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// UsedAbility.belongsToMany(UsedAbility, {
//     through: AbilityFavorite,
//     as: 'liked',
//     foreignKey: 'user_id',
// });

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

Follow.belongsTo(User, { foreignKey: 'follower_id', as: 'Follower' });
Follow.belongsTo(User, { foreignKey: 'following_id', as: 'Following' });

// User: Review = N : M
User.belongsToMany(User, {
    through: Review,
    as: 'SellerReviews',
    foreignKey: 'seller_id',
});

User.belongsToMany(User, {
    through: Review,
    as: 'BuyerReviews',
    foreignKey: 'buyer_id',
});

Review.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });
Review.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });

// ChatRoom : ChatMessage = 1 : N
ChatRoom.hasMany(ChatMessage, {
    foreignKey: 'chat_room_id',
    targetKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ChatMessage.belongsTo(ChatRoom, { foreignKey: 'chat_room_id' });

// // UsedProduct : ChatRoom = 1 : N
UsedProduct.hasMany(ChatRoom, {
    foreignKey: 'pro_abil_id',
    targetKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(User, {
    through: ChatRoom,
    as: 'User_1',
    foreignKey: 'user_id_1',
});
User.belongsToMany(User, {
    through: ChatRoom,
    as: 'User_2',
    foreignKey: 'user_id_2',
});

User.belongsToMany(User, {
    through: ChatMessage,
    as: 'Sender',
    foreignKey: 'sender_id',
});
User.belongsToMany(User, {
    through: ChatMessage,
    as: 'Receiver',
    foreignKey: 'receiver_id',
});

// UsedAbility : ChatRoom = 1 : N
UsedAbility.hasMany(ChatRoom, {
    foreignKey: 'pro_abil_id',
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
db.Follow = Follow;
db.Review = Review;
db.ChatRoom = ChatRoom;
db.ChatMessage = ChatMessage;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
