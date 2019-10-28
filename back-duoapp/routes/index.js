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

router.get('/test', async (req, res) => {
    // lolAPI.makeGetRequest();
    const isInfo = await lolAPI.hasNickname('마눅')
    // console.log('-----------------------------------------------------------------------------------------')
    // console.log(isInfo)
    // console.log('-----------------------------------------------------------------------------------------')
    if (isInfo) {
        const data = await lolAPI.getLOLData("마눅")
        console.log('닉넴 있음')
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        // console.log(data)
        console.log(data['tiers'][0])   // tier
        console.log(data['tiers'][1])   // rank
        console.log(data['tiers'][2])   // leaguePoint
        console.log(data['recentGame']) // 최근 5게임(list[승패, kills, deaths, assists, champion])
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    }
    else {
        console.log('닉네임을 확인해주세요')
    }
    // lolAPI.getLOLData().then(function (info) {
    //     console.log('닉네임 상태?')
    //     console.log(info)
    // });
    
    // const myid = "5db253811c9d4400000f213a"
    // // const nowUser = User.findById(`${myid}`)
    // // console.log(nowUser)
    // // const nowUser = User.findOne({_id:myid})

    // 유저 찾는 코드
    // User.find({_id:myid},function(err,data){
    //     if (err) return handleError(err);
    //     console.log('find all data => ',data)
    //     // data[0]['mytier']['tier'] = '플래티넘'
    //     console.log(data[0]['tiers'])
    //     // User.nickname = '무적꼬부기짱짱짱'
    //     return data[0] 
    // })

    // 유저 업데이트 하는 코드
    // User.update({_id:myid}, {tiers:{tier:'벌레티넘', rank:'IV', leaguePoint:10}},
    // function(err, res) {
        // if (err) { 
        //     callback(err, null);
        // } else { 
        //     callback(null, res);
        // }
    // });

    res.json({'LOLAPI':'gg'})
})

module.exports = router;


// app.put('url', (req, res) => {

//     const modelId = req.body.model_id;
//     const newName = req.body.name;

//     MyModel.findById(modelId).then((model) => {
//         return Object.assign(model, {name: newName});
//     }).then((model) => {
//         return model.save();
//     }).then((updatedModel) => {
//         res.json({
//             msg: 'model updated',
//             updatedModel
//         });
//     }).catch((err) => {
//         res.send(err);
//     });
// });
