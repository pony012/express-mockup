const express = require('express');
const router = express.Router();
const db = require('../database');

/* GET users listing. */
router.get('/', function(req, res) {
    const dbInstance = db();
    const users = dbInstance.User.findAll();
    users.then(users => {
        res.send(users);
    });
});

router.get('/:userId', function(req, res) {
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
});

module.exports = router;
