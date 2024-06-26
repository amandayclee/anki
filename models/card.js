const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    front: {
        type: String
    },
    back: {
        type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userReviewLog: [{
        type: Schema.Types.ObjectId,
        ref: 'UserReviewLog',
        required: true
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Card', cardSchema);