const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    User.find({})
        .then(users => {
            console.log('찾았습니다.')
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })


})
router.get('/:username', async(req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username: username });
        res.json(user)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/', (req, res) => {
    const { username, nickname } = req.body;
    User.create({ username: username, nickname: nickname })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })

})

module.exports = router;