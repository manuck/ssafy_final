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
    let search = req.body['nickname']
    let myRecentGame = []
    search = search.replace(/\s/gi, "");
    const id = req.body['userId']
    const isInfo = await lolAPI.hasNickname(search)
    if (isInfo) {
        const data = await lolAPI.getLOLData(search)

        for (let j = 0; j < data['recentGames'].length; j++) {
            myRecentGame.push(
                {win: data['recentGames'][j][0],
                kills: data['recentGames'][j][1],
                deaths: data['recentGames'][j][2],
                assists: data['recentGames'][j][3],
                champion: data['recentGames'][j][4],
                }
            )

        }

        // 유저 업데이트 하는 코드
        let inNickName = false
        await User.find({_id:id}, function(err, data) {
            if (data[0]['nicknames'] === undefined || data[0]['nicknames'].length == 0) {
                inNickName = false
            }
            else {
                inNickName = data[0]['nicknames'].includes(search)
            }
        })
   
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
            recentgames: myRecentGame
        }
        });
        res.json(data)
    }
    else {
        console.log('닉네임을 확인해주세요')
        res.json({'error':'에러에러에러에러'})
    }

})


module.exports = router;
