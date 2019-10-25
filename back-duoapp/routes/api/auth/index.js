var express = require('express');
var router = express.Router();
const googleRouter = require('./google');

router.use('/google', googleRouter);

module.exports = router;