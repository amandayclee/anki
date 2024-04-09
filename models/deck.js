const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: {
        type: String
    }, 
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Deck', deckSchema);