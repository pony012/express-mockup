'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    up: (queryInterface, /* Sequelize */) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'Alan',
            password: bcrypt.hashSync('password', 10),
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, /* Sequelize */) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
