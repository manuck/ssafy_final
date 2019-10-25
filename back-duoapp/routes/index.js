var express = require('express');
var router = express.Router();
const lolAPI = require('../lolAPI');
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

router.get('/test', (req, res) => {
    // lolAPI.makeGetRequest();
    let info = lolAPI.getLOLData();
    res.json({'이이이잉':'앗살라마라이쿰'})
})

module.exports = router;