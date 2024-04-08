const Card = require('../models/deck');

module.exports = {
    index,
    new: newDeck
};


async function index(req, res) {
    res.render('home', { title: 'All Decks' });
}

async function newDeck(req, res) {
    res.render('decks/new', { title: 'Add a Deck', msg: '' });
}