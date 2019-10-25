var express = require('express');
var router = express.Router();
const apiRouter = require('./api');
const authCheck = require('../middlewares/auth')
const User = require('../models/user')
    /* GET home page. */


// router.get('/', authCheck, function(req, res, next) {
//     console.log('gg')
//     res.render('index', { title: 'Express' });
// });
router.get('/authtest', authCheck, async(req, res) => {
    const { _id } = req.decoded;
    // console.log('로그인 성공')
    const user = await User.findById(_id);
    res.json(user);
});
router.use('/api', apiRouter);

module.exports = router;