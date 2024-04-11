const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const userReviewLogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewTime: [{
        type: Date,
        default: null
    }],
    dueTime: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});


// Compile the schema into a model and export it
module.exports = mongoose.model('UserReviewLog', userReviewLogSchema);