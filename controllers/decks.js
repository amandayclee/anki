const Deck = require('../models/deck');

module.exports = {
    index,
    new: newDeck,
    create
};


async function index(req, res) {
    const decks = await Deck.find({});
    res.render('home', { decks, title: 'All Decks'});
}

async function newDeck(req, res) {
    res.render('decks/new', { title: 'Add a Deck', msg: '' });
}

async function create(req, res) {
    try {
        const newDeck = new Deck(req.body);
        await newDeck.save();
        res.render('decks/new', { title: 'Add a Deck', msg: 'Successfully Added!' });
    } catch (error) {
        res.render('decks/new', { title: 'Add a Deck', msg: error }) //render file path
    }
}