const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = process.env.NODE_ENV || 'development';
const googleSecret = require('./config/config.json')[env].googleSecret;
const User = require('./models/user')


exports.init = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.username)
    })

    passport.deserializeUser(function(username, done) {
        User.findOne({ username: username }, function(err, user) {
            done(err, user)
        })
    })

    passport.use('googleUser', new GoogleStrategy({
            clientID: googleSecret.client_id,
            clientSecret: googleSecret.client_secret,
            callbackURL: googleSecret.redirect_uris[0]
        },
        (accessToken, refreshToken, profile, done) => {

            User.findOne({ id: profile.id }, (err, user) => {
                return done(err, user);
            })

        }
    ))
}