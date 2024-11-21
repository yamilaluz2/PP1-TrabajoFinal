const { Sequelize } = require("sequelize");
const parameters = require("../config/config");

const sequelize = new Sequelize(
    parameters.database,
    parameters.username,
    parameters.password, {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('./usuarios')(sequelize, Sequelize);
db.Following = require('./following')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);


module.exports = db;