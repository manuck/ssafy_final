var express = require('express');
var router = express.Router();
const authRouter = require('./auth');

router.use('/auth', authRouter);
const usersIndex = require('./users')
    /* GET home page. */
router.use('/users', usersIndex);

module.exports = router;