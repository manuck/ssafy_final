const axios = require('axios');
mykey = 'RGAPI-88c34019-ab7a-4462-b8e2-5a5742a1dbff'

exports.getLOLData = function () {
    // let recentlyGame = [[],[],[],[],[]]
    let summonerUrl, matchUrl, leagueUrl; 
    summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/마눅?api_key=${mykey}`
    axios.get(encodeURI(summonerUrl))
    .then( summonerData => { 
        console.log(summonerData.data)
        let data = summonerData.data
        // console.log(data['id'])
        let userId = data['id']
        let accountId = data['accountId']
        let gamelist = []
        leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${mykey}`
        matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${mykey}`
        axios.get(encodeURI(leagueUrl))
        .then( userData => {
            if (userData.data[0]) {
            let tier = userData.data[0]['tier']
            let rank = userData.data[0]['rank']
            let leaguePoint = userData.data[0]['leaguePoints']
            console.log(tier, rank, leaguePoint)
            }
        }).catch (error => {
            console.error(error)
        })
        axios.get(matchUrl)
        .then( async (matchData) => {
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
            let recentlyGame = gamelist.map( async (game) => {
                // console.log(game)
                let gameInfoUrl = `https://kr.api.riotgames.com/lol/match/v4/matches/${game}?api_key=${mykey}`
                const gameData = await axios.get(gameInfoUrl)
                let participantId = 0
                // let index = 0     
                for (let j = 0; j < gameData.data['participantIdentities'].length; j++){
                    if (gameData.data['participantIdentities'][j]['player']['accountId'] === accountId) {
                        participantId = gameData.data['participantIdentities'][j]['participantId']
                        break
                    }
                }
                // for (let j = 0; j < 5; j++) {
                //     if (gamelist[j] === game){
                //         index = j
                //         break
                //     }
                // }
                if (gameData.data['participants'][participantId-1]['stats']['win'] === true) {
                    // console.log('승리')
                    // console.log(gameData.data['participants'][participantId-1]['championId'])
                    // console.log(gameData.data['participants'][participantId-1]['stats']['kills'], gameData.data['participants'][participantId-1]['stats']['deaths'], gameData.data['participants'][participantId-1]['stats']['assists'])
                    let champion = gameData.data['participants'][participantId-1]['championId']
                    let kills = gameData.data['participants'][participantId-1]['stats']['kills']
                    let deaths = gameData.data['participants'][participantId-1]['stats']['deaths']
                    let assists = gameData.data['participants'][participantId-1]['stats']['assists']
                    // recentlyGame[index] = ['승리', kills, deaths, assists, champion]
                    return ['승리', kills, deaths, assists, champion] 
                    // return '승리'
                }
                else {
                    // console.log('패배')
                    // console.log(gameData.data['participants'][participantId-1]['championId'])
                    // console.log(gameData.data['participants'][participantId-1]['stats']['kills'], gameData.data['participants'][participantId-1]['stats']['deaths'], gameData.data['participants'][participantId-1]['stats']['assists'])
                    let champion = gameData.data['participants'][participantId-1]['championId']
                    let kills = gameData.data['participants'][participantId-1]['stats']['kills']
                    let deaths = gameData.data['participants'][participantId-1]['stats']['deaths']
                    let assists = gameData.data['participants'][participantId-1]['stats']['assists']
                    // recentlyGame[index] = ['패배', kills, deaths, assists, champion]
                    return ['패배', kills, deaths, assists, champion]
                    // return '패배'
                }
            })
            recentlyGame = await Promise.all(recentlyGame);
            console.log(recentlyGame)
        }).catch (error => {
            console.error(error)
        })
           
    }).catch (error => {
        console.error(error)
    })
}