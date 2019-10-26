// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const User = new Schema({
//     username: { type: String, unique: true },
//     nicknames: [String],
//     representationNickname: String,
//     tiers: {
//         tier: String,
//         rank: String,
//         leaguePoint: Number
//     },
//     majorPosition: String,
//     minorPosition: String,
//     apiUpdatedAt: Date,
// }, {
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
// })

// module.exports = mongoose.model('User', User)


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', userSchema);