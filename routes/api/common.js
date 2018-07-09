const express = require('express');
const router = express.Router();
const db = require('../../database');
const jwt = require('jsonwebtoken');

router.post('/login', function(req, res) {
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
                user,
                iis: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
            }, process.env.JWT_SECRET || 'my_secret_jwt');
            res.send({token});
        } else {
            res.send(404, 'No!!');
        }
    });
});

module.exports = router;
