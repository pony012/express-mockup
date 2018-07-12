'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    var Ticket = sequelize.define('Ticket', {
        uuid: DataTypes.STRING,
        price: DataTypes.STRING,
        date: DataTypes.DATE
    }, {});
    Ticket.associate = function(models) {
        Ticket.belongsTo(models.User);
    };
    Ticket.beforeCreate((ticket) => {
        return new Promise((resolve) => {
            crypto.randomBytes(32, function(err, buffer) {
                ticket.uuid = buffer.toString('hex');
                resolve(ticket);
            });
        });
    });
    return Ticket;
};