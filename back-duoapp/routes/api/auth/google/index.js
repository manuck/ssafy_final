const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/config.json')[env]


router.get('/', passport.authenticate('googleUser', { scope: ['profile', 'email'] }))

router.get(
    '/callback',
    passport.authenticate('googleUser', { failureRedirect: '/', session: true }),
    (req, res) => {
        jwt.sign({
                _id: req.user._id,
            },
            req.app.get('jwt-secret'), {
                expiresIn: '3h',
                issuer: 'Kiev Opalcat',
                subject: 'user'
            }, (err, token) => {
                if (err) {
                    console.log('토큰 생성 실패: ', err)
                    res.redirect('/')
                }
                // res.cookie('MnMsToken', token, { maxAge: 3600 * 1000 * 3 })
                res.status(200).json({token:token});
            }
        )
    }
)

module.exports = router;