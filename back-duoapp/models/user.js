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
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('User', User)

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number
//     },
//     gender: {
//         type: String
//     }
// });

// export default mongoose.model('user', UserSchema);