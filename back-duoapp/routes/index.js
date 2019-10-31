var express = require('express');
var router = express.Router();
const lolAPI = require('../lolAPI');
const apiRouter = require('./api');
const authCheck = require('../middlewares/auth');
const User = require('../models/user');
const Recruitment = require('../models/recruitment');
    
router.get('/authtest', authCheck, async(req, res) => {
    const { _id } = req.decoded;
    const user = await User.findById(_id);
    res.json(user);
});

router.use('/api', apiRouter);

router.post('/test', async (req, res) => {
    // lolAPI.makeGetRequest();
    // ifInfo : true, false 닉네임이 검색되는지 확인
    let result = await Recruitment.find({});
    console.log('###############################################################################')
    console.log(result)
    console.log(req.body['nickname'])
    console.log(req.body['username'])
    console.log(req.body['userId'])
    console.log('###############################################################################')
    const search = req.body['nickname']
    const id = req.body['userId']
    const isInfo = await lolAPI.hasNickname(search)
    if (isInfo) {
        const data = await lolAPI.getLOLData(search)
        console.log('닉넴 있음')
        console.log('------------------------------------------------------------------------')
        console.log(data)
        // data['tiers'] : tier정보, data['recentGame'] : 최근 5게임
        console.log(id)
        console.log(data['tiers'][0])   // tier
        console.log(data['tiers'][1])   // rank
        console.log(data['tiers'][2])   // leaguePoint
        console.log(data['recentGames']) // 최근 5게임(list[승패, kills, deaths, assists, champion])
        console.log('------------------------------------------------------------------------')
        // 유저 업데이트 하는 코드
        let inNickName = Boolean
        await User.find({_id:id}, function(err, data) {
            inNickName = data[0]['nicknames'].includes(search)
        })
        console.log(inNickName)
        if (inNickName === false) {
            const updateresult = await User.findOneAndUpdate({_id:id}, {$push: {nicknames: search}})
        }

        await User.findOneAndUpdate({_id:id},{
            $set: {representationNickname:search,
            tiers:{
                tier: data['tiers'][0], 
                rank: data['tiers'][1], 
                leaguePoint: data['tiers'][2]
            },
            recentgames: [
                { win: data['recentGames'][0][0],
                kills: data['recentGames'][0][1],
                deaths: data['recentGames'][0][2],
                assists: data['recentGames'][0][3],
                champion: data['recentGames'][0][4],
                },
                { win: data['recentGames'][1][0],
                kills: data['recentGames'][1][1],
                deaths: data['recentGames'][1][2],
                assists: data['recentGames'][1][3],
                champion: data['recentGames'][1][4],
                },
                { win: data['recentGames'][2][0],
                kills: data['recentGames'][2][1],
                deaths: data['recentGames'][2][2],
                assists: data['recentGames'][2][3],
                champion: data['recentGames'][2][4],
                },
                { win: data['recentGames'][3][0],
                kills: data['recentGames'][3][1],
                deaths: data['recentGames'][3][2],
                assists: data['recentGames'][3][3],
                champion: data['recentGames'][3][4],
                },
                { win: data['recentGames'][4][0],
                kills: data['recentGames'][4][1],
                deaths: data['recentGames'][4][2],
                assists: data['recentGames'][4][3],
                champion: data['recentGames'][4][4],
                }
            ]
        }
        });
        // User.update({_id:myid}, {tiers:{tier:'벌레티넘', rank:'IV', leaguePoint:10}},
        // function(err, res) {
        //     if (err) { 
        //         callback(err, null);
        //     } else { 
        //         callback(null, res);
        //     }
        // });
        res.json(data)
    }
    else {
        console.log('닉네임을 확인해주세요')
        res.json({'error':'에러에러에러에러'})
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
