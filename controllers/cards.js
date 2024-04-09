const Card = require('../models/card');
const Deck = require('../models/deck');

module.exports = {
    index,
    new: newCard,
    create
};

async function index(req, res) {
    const cards = await Card.find({});
    res.render('cards/index', { cards, title: 'All Cards' });
}

async function newCard(req, res) {
    const decks = await Deck.find({});
    res.render('cards/new', { decks, title: 'Add a Card', msg: ''});
}

async function create(req, res) {
    const decks = await Deck.find({});
    console.log(decks);
    try {
        console.log(req.body);
        const newCard = new Card(req.body);
        await newCard.save();
        res.render('cards/new', { decks, title: 'Add a Card', msg: 'Successfully Added!' });
    } catch (error) {
        res.render('cards/new', { decks, title: 'Add a Card', msg: error }) //render file path
    }
}