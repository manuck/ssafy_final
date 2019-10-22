var express = require('express');
var router = express.Router();
const lolAPI = require('../lolAPI');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/test', (req, res) => {
    // lolAPI.makeGetRequest();
    console.log('aaa')
    lolAPI.getLOLData();
    console.log('aaa')
  res.json({'aa':'aaa'})
})

module.exports = router;