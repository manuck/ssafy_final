var express = require('express');
var router = express.Router();
const lolAPI = require('../lolAPI');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.get('/test', (req, res) => {
    // lolAPI.makeGetRequest();
    let info = lolAPI.getLOLData();
    res.json({'이이이잉':'앗살라마라이쿰'})
})

module.exports = router;