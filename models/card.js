const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    front: {
        type: String
    },
    back: {
        type: String
    },
    deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Card', cardSchema);