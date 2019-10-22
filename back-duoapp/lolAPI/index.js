const axios = require('axios');

exports.getLOLData = function () {
    console.log('오호미') 
    console.log('try')
    let summonerUrl, matchUrl, leagueUrl; 
    summonerUrl = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/마눅?api_key=RGAPI-978198f5-a84c-4aa4-99f5-b5d45f5230f1'; 
    axios.get(encodeURI(summonerUrl))
    .then( summonerData => { 
        console.log('asdasdasdad');
        console.log(summonerData.data);
        let data = summonerData.data;
        console.log(data['id']);
        let userId = data['id'];
        leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=RGAPI-978198f5-a84c-4aa4-99f5-b5d45f5230f1`
        axios.get(encodeURI(leagueUrl))
        .then( userData => {
            // console.log(userData.data);
            let tier = userData.data[0]['tier'];
            let rank = userData.data[0]['rank'];
            let leaguePoint = userData.data[0]['leaguePoints'];
            console.log(tier, rank, leaguePoint)
        })

    })
    .catch (error => {
        console.log('error 입니다.');
        console.error(error);
    })
}