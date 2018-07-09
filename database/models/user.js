'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
    User.associate = function(/* models */) {
    // associations can be defined here
    };
    User.beforeCreate((user) => {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
    });
    User.prototype.comparePassword = function (somePassword) {
        return bcrypt.compareSync(somePassword, this.password);
    };
    User.prototype.toJSON =  function () {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
    };
    return User;
};