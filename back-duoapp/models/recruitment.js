const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recruitment = new Schema({
    user = { type: Schema.Types.ObjectId, ref: 'User', required: true },
    position: String,
    status: Boolean
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Recruitment', Recruitment)