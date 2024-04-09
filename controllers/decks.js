const Deck = require('../models/deck');
const Card = require('../models/card');

module.exports = {
    index,
    new: newDeck,
    create,
    delete: deleteDeck
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
        // Add the user-centric info to req.body (the new review)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        const newDeck = new Deck(req.body);
        await newDeck.save();
        res.render('decks/new', { title: 'Add a Deck', msg: 'Successfully Added!' });
    } catch (error) {
        res.render('decks/new', { title: 'Add a Deck', msg: error }) //render file path
    }
}

async function deleteDeck(req, res) {
    try {
        const deck = await Deck.findById(req.params.id);
        for (let obj of deck.cards) {
            await Card.findByIdAndDelete(obj);
        }
        await Deck.findByIdAndDelete(req.params.id);
        console.log(await Deck.find({}));
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}