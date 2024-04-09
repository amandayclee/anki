const Card = require('../models/card');
const Deck = require('../models/deck');

module.exports = {
    index,
    new: newCard,
    create,
    delete: deleteCard
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
    const deck = await Deck.findById(req.body.deck);

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    const {front, back, user, userName, userAvatar} = req.body;
    const newCard = await Card.create({front, back, user, userName, userAvatar});
    deck.cards.push(newCard._id);
    try {
        await deck.save();
        res.render('cards/new', { decks, title: 'Add a Card', msg: 'Successfully Added!' });
    } catch (error) {
        res.render('cards/new', { decks, title: 'Add a Card', msg: error }) //render file path
    }
}

async function deleteCard(req, res) {
    try {
        const deck = await Deck.findById(req.body.deck);
        deck.cards.remove(req.params.id);
        await Card.findByIdAndDelete(req.params.id);
        await deck.save();
        res.redirect('/cards');
    } catch (err) {
        console.log(err);
    }
}