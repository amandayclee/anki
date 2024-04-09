const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    front: {
        type: String
    },
    back: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Card', cardSchema);