const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: { type: String, unique: true },
    nicknames: [String],
    representationNickname: String,
    tiers: {
        tier: String,
        rank: String,
        leaguePoint: Number
    },
    majorPosition: String,
    minorPosition: String,
    apiUpdatedAt: Date,
    recentgame: [
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

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

// module.exports = mongoose.model('User', userSchema);
