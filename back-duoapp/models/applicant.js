const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Applicant = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        required: true
    },
    recruitment: {
        type: Schema.Types.ObjectId,
        ref: 'Recruitment',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Applicant', Applicant)