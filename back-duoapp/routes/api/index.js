var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const authRouter = require('./auth');

router.use('/auth', authRouter);
=======
const usersIndex = require('./users')
    /* GET home page. */
router.use('/users', usersIndex);
>>>>>>> 39cd4475f85cf09d2ea49c8d643d1cc2be2e6767

module.exports = router;