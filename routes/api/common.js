const express = require('express');
const router = express.Router();
const db = require('../../database');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('express-jwt');
const blacklist = require('express-jwt-blacklist');
const client = require('redis').createClient();
const limiter = require('express-limiter')(router, client);
const crypto = require('crypto');

const commonLimiter = limiter({
    lookup: 'connection.remoteAddress',
    total: 10,
    expire: 1000 * 60
});

router.post(
    '/signup', 
    commonLimiter,
    async function(req, res) {
        const dbInstance = db();
        const { username, password } = req.body;
        const user = await dbInstance.User.findOne({
            where: {
                username
            }
        });
        if (user) {
            res.send(409, 'User already exists');
        } else {
            crypto.randomBytes(48, function(err, buffer) {
                dbInstance.User.create({
                    username,
                    password,
                    signUpToken: buffer.toString('hex')
                });
                res.send(200);
            });
        }
    }
);

router.get(
    '/verify/:token',
    commonLimiter,
    async function(req, res) {
        const dbInstance = db();
        const user = await dbInstance.User.findOne({
            where: {
                signUpToken: req.params.token
            }
        });
        if (user) {
            await user.update({
                verified: true,
                signUpToken: null
            });
            res.send(200);
        } else {
            res.send(401);
        }
    }
);

router.post(
    '/login', 
    commonLimiter, 
    async function(req, res) {
        const dbInstance = db();
        const { username, password } = req.body;
        const user = await dbInstance.User.findOne({
            where: {
                username,
                verified: true
            }
        });
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

router.post(
    '/logout',
    commonLimiter, 
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
