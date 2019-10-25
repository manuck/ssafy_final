const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: { type: String, unique: true },
    nickname: String,
    tiers: {
        tier: String,
        rank: String,
        leaguePoint: Number
    },
    majorPosition: String,
    minorPosition: String,
    apiUpdatedAt: Date,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


User.statics.findOrCreate = function(condition, callback) {
    // const { username } = condition
    // condition = { username: username }
    this.findOneAndUpdate(condition, {}, (err, user) => {
        if (user) {
            return callback(err, user)
        } else {
            this.create(condition, (err, user) => {
                return callback(err, user)
            })
        }
    })
}

module.exports = mongoose.model('User', User)