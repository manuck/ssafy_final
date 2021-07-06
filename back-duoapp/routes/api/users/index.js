const express = require('express')
const router = express.Router();;

router.get('/', (req, res) => {
    res.json({ 'aa': '안녕 여기는 users/' })
})

module.exports = router;