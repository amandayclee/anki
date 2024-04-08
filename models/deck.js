const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('Deck', cardSchema);