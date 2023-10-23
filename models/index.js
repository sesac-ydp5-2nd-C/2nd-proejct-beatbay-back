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

const UsedProduct = require('./UsedProduct')(sequelize, Sequelize);
const UsedAbility = require('./UsedAbility')(sequelize, Sequelize);

db.UsedProduct = UsedProduct;
db.UsedAbility = UsedAbility;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
