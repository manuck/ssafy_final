const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nicknames: {
        type: [String],
    },
    representationNickname: {
        type: String,
    },
    tiers: {
        tier: {
            type: String
        },
        rank: {
            type: String
        },
        leaguePoint: {
            type: Number
        }
    },
    majorPosition: {
        type: String
    },
    minorPosition: {
        type: String
    },
    apiUpdatedAt: {
        type: Date
    },
    recentgames: [
        {
            win: Boolean,
            kills: Number,
            deaths: Number,
            assists: Number,
            champion: Number
        }
    ]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

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
module.exports = mongoose.model('User', userSchema);
