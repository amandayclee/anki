const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: {
        type: String
    }, 
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Deck', deckSchema);