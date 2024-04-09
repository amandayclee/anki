const Card = require('../models/card');
const Deck = require('../models/deck');

module.exports = {
    index,
    new: newCard,
    create
};

async function index(req, res) {
    const decks = await Deck.find({}).populate("cards");
    res.render('cards/index', { decks, title: 'All Cards' });
}

async function newCard(req, res) {
    const decks = await Deck.find({});
    res.render('cards/new', { decks, title: 'Add a Card', msg: ''});
}

async function create(req, res) {
    const decks = await Deck.find({});
    const {front, back} = req.body;
    const newCard = await Card.create({front, back});
    const deck = await Deck.findById(req.body.deck);
    deck.cards.push(newCard._id);
    try {
        await deck.save();
        res.render('cards/new', { decks, title: 'Add a Card', msg: 'Successfully Added!' });
    } catch (error) {
        res.render('cards/new', { decks, title: 'Add a Card', msg: error }) //render file path
    }
}