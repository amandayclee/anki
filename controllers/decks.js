const Deck = require('../models/deck');
const Card = require('../models/card');

module.exports = {
    index,
    new: newDeck,
    create,
    delete: deleteDeck,
    show,
    edit,
    update
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

async function show(req, res) {
    const deck = await Deck.findById(req.params.id).populate('cards');
    res.render('decks/show', { deck, title: `You're reviewing ${deck.name}` });
}

async function edit(req, res) {
    const deck = await Deck.findById(req.params.id);
    res.render('decks/edit', {
        title: 'Edit Deck Name',
        deck,
        msg: ''
    });
}

async function update(req, res) {
    try {
        const deck = await Deck.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name }
        );
        await deck.save();
        res.render(`decks/edit`, {
            title: 'Edit Deck Name',
            deck,
            msg: 'Successfully Updated!'
        });
    } catch (error) {
        console.error(error);
    }
}