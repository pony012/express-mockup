const express = require('express');
const router = express.Router();
const db = require('../../database');
const jwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');

/* GET users listing. */
router.get('/', function(req, res) {
    const dbInstance = db();
    const users = dbInstance.User.findAll();
    users.then(users => {
        res.send(users);
    });
});

router.get(
    '/:userId',
    jwt({
        secret: process.env.JWT_SECRET || 'my_secret_jwt',
        isRevoked: blacklist.isRevoked
    }),
    function(req, res) {
        if (req.user.id === parseInt(req.params.userId, 10)) {
            const dbInstance = db();
            const users = dbInstance.User.findById(req.params.userId);
            users.then(users => {
                if (users) {
                    res.send(users);
                } else {
                    res.send(404, {
                        err: 'not found'
                    });
                }
            }).catch((err) => {
                res.send(500, err);
            });
        } else {
            res.send(401);
        }
    });

module.exports = router;
