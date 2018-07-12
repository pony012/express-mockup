'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: {
                    args: true,
                    msg: 'Username already exists',
                }
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            verified: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            signUpToken: {
                allowNull: true,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            }
        });
    },
    down: (queryInterface, /* Sequelize */) => {
        return queryInterface.dropTable('Users');
    }
};