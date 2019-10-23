const axios = require('axios');
mykey = 'RGAPI-bbcddc08-746e-4253-bc78-ea99352ee6c5'
let zzzzz = []
exports.getLOLData = function () {
    console.log('오호미') 
    console.log('try')
    let summonerUrl, matchUrl, leagueUrl; 
    summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/마눅?api_key=${mykey}`
    axios.get(encodeURI(summonerUrl))
    .then( summonerData => { 
        console.log('asdasdasdad')
        console.log(summonerData.data)
        let data = summonerData.data
        console.log(data['id'])
        let userId = data['id']
        let accountId = data['accountId']
        let gamelist = []
        leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${mykey}`
        matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${mykey}`
        axios.get(encodeURI(leagueUrl))
        .then( userData => {
            console.log(userData.data)
            let tier = userData.data[0]['tier']
            let rank = userData.data[0]['rank']
            let leaguePoint = userData.data[0]['leaguePoints']
            console.log(tier, rank, leaguePoint)
        }).catch (error => {
            console.error(error)
        })
        axios.get(matchUrl)
        .then( matchData => {
            // console.log(matchData.data['matches'])
            let matches = matchData.data['matches']
            let cnt = 0
            for (let i = 0; i < matches.length; i++){
                if (matches[i]['queue'] === 420) {
                    gamelist.push(matches[i]['gameId'])
                    cnt += 1
                }
                if (cnt === 5) {
                    break
                }
            }
            gamelist.map( async (game) => {
                console.log(game)
                let gameInfoUrl = `https://kr.api.riotgames.com/lol/match/v4/matches/${game}?api_key=${mykey}`
                const gameData = await axios.get(gameInfoUrl)
                let participantId = 0
                for (let j = 0; j < gameData.data['participantIdentities'].length; j++){
                    if (gameData.data['participantIdentities'][j]['player']['accountId'] === accountId) {
                        participantId = gameData.data['participantIdentities'][j]['participantId']
                        console.log(participantId)
                        break
                    }
                }
                if (gameData.data['participants'][participantId-1]['stats']['win'] === true) {
                    console.log('승리')
                    console.log(gameData.data['participants'][participantId-1]['stats']['kills'], gameData.data['participants'][participantId-1]['stats']['deaths'], gameData.data['participants'][participantId-1]['stats']['assists'])
                    let kills = gameData.data['participants'][participantId-1]['stats']['kills']
                    let deaths = gameData.data['participants'][participantId-1]['stats']['deaths']
                    let assists = gameData.data['participants'][participantId-1]['stats']['assists']
                    zzzzz.push(['승리', kills, deaths, assists])
                    return ['승리', kills, deaths, assists] 
                }
                else {
                    console.log('패배')
                    console.log(gameData.data['participants'][participantId-1]['stats']['kills'], gameData.data['participants'][participantId-1]['stats']['deaths'], gameData.data['participants'][participantId-1]['stats']['assists'])
                    let kills = gameData.data['participants'][participantId-1]['stats']['kills']
                    let deaths = gameData.data['participants'][participantId-1]['stats']['deaths']
                    let assists = gameData.data['participants'][participantId-1]['stats']['assists']
                    zzzzz.push(['패배', kills, deaths, assists])
                    return ['패배', kills, deaths, assists]
                }
                // console.log(gameData.data['participants'][participantId-1]['stats']['win'])
                // console.log(gameData.data['participantIdentities'][participantId-1])
                // participants
                // participantIdentities
                })
                console.log(gamelist)
            }).catch (error => {
                console.error(error)
            })

    
    }).catch (error => {
        console.error(error)
    })
}