var express = require('express');
var router = express.Router();
const usersIndex = require('./users')
    /* GET home page. */
router.use('/users', usersIndex);

module.exports = router;