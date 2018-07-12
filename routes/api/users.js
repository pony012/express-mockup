const express = require('express');
const router = express.Router();
const db = require('../../database');
const jwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');

/* GET users listing. */
router.get('/', async function(req, res) {
    const dbInstance = db();
    const users = await dbInstance.User.findAll();
    res.send(users);
});

router.get(
    '/:userId',
    jwt({
        secret: process.env.JWT_SECRET || 'my_secret_jwt',
        isRevoked: blacklist.isRevoked
    }),
    async function(req, res) {
        if (req.user.id === parseInt(req.params.userId, 10)) {
            const dbInstance = db();
            const user = await dbInstance.User.findById(req.params.userId, {include: dbInstance.Ticket}).catch((err) => {
                res.send(500, err);
            });
            if (user) {
                res.send(user);
            } else {
                res.send(404, {
                    err: 'not found'
                });
            }
        } else {
            res.send(401);
        }
    });

router.post(
    '/:userId/tickets',
    jwt({
        secret: process.env.JWT_SECRET || 'my_secret_jwt',
        isRevoked: blacklist.isRevoked
    }),
    async function(req, res) {
        if (req.user.id === parseInt(req.params.userId, 10)) {
            const dbInstance = db();
            const user = await dbInstance.User.findById(req.params.userId).catch((err) => {
                res.send(500, err);
            });
            if (user) {
                const { price } = req.body;
                const ticket = await dbInstance.Ticket.create({
                    price,
                    UserId: user.id
                });
                res.send({ticket});
            } else {
                res.send(404, {
                    err: 'not found'
                });
            }
        } else {
            res.send(401);
        }
    });
module.exports = router;
