'use strict';

const database = require('./models');
let sequelize = null;

module.exports = function db() {
    if (!sequelize) {
        sequelize = database;
    }
    return sequelize;
};
