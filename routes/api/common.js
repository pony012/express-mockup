const express = require('express');
const router = express.Router();
const db = require('../../database');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('express-jwt');
const blacklist = require('express-jwt-blacklist');
const client = require('redis').createClient();
const limiter = require('express-limiter')(router, client);

router.post(
    '/login', 
    limiter({
        lookup: 'connection.remoteAddress',
        total: 10,
        expire: 1000 * 60
    }), function(req, res) {
        const dbInstance = db();
        const { username, password } = req.body;
        const user = dbInstance.User.findOne({
            where: {
                username
            }
        });
        user.then(user => {
            if (user && user.comparePassword(password)) {
                const token = jwt.sign({
                    id: user.id,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                    sub: user.id
                }, process.env.JWT_SECRET || 'my_secret_jwt');
                res.send({token});
            } else {
                res.send(401);
            }
        });
    });

router.post(
    '/logout',
    limiter({
        lookup: 'connection.remoteAddress',
        total: 10,
        expire: 1000 * 60
    }), 
    jwtMiddleware({
        secret: process.env.JWT_SECRET || 'my_secret_jwt',
        isRevoked: blacklist.isRevoked
    }),
    function(req, res) {
        blacklist.revoke(req.user);
        res.send(200);
    }
);

module.exports = router;
