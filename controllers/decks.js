const Deck = require('../models/deck');
const Card = require('../models/card');
const UserReviewLog = require('../models/userReviewLog');

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
    const cards = await Card.find({});

    let newList = [];
    let dueList = [];


    if (req.user) {
        for (let card of cards) {
            const cardObj = await Card.findById(card);
            let exist = null;
            if (cardObj.userReviewLog.length > 0) {
                for (let reviewLoginACard of cardObj.userReviewLog) {
                    const review = await UserReviewLog.findById(reviewLoginACard);
                    if (review.user._id.toString() === req.user._id.toString()) {
                        exist = true;
                        break;
                    };
                }
                if (!exist) {
                    const newUserReviewLog = await UserReviewLog.create({ user: req.user._id, reviewTime: [], dueTime: null });
                    cardObj.userReviewLog.push(newUserReviewLog);
                    await newUserReviewLog.save();
                    await cardObj.save();
                }
            } else {
                const newUserReviewLog = await UserReviewLog.create({ user: req.user._id, reviewTime: [], dueTime: null });
                cardObj.userReviewLog.push(newUserReviewLog);
                await newUserReviewLog.save();
                await cardObj.save();
            }
        }

        for (let deck of decks) {
            const deckObj = await Deck.findById(deck);
            let newCardsCount = 0;
            let dueCardsCount = 0;
      
            for (let card of deckObj.cards) {
                const cardObj = await Card.findById(card);
                for (let reviewlog of cardObj.userReviewLog) {
                    const reivewObj = await UserReviewLog.findById(reviewlog);
                    if (reivewObj.user._id.toString() === req.user._id.toString()) {

                        if (reivewObj.reviewTime.length === 0) {
                            newCardsCount++;
                        }
                
                        if (reivewObj.dueTime && new Date(reivewObj.dueTime) < new Date()) {
                            dueCardsCount++;
                        }
                    }
                }
            }
            newList.push(newCardsCount);
            dueList.push(dueCardsCount);
        }
    }

    // Redirect or render appropriate view
    if (req.user) {
        res.render('home', { decks, title: 'All Decks', newList, dueList});
    } else {
        res.render('home', { decks, title: 'All Decks' });
    }
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
            msg: 'Successfully Updated!',
        });
    } catch (error) {
        console.error(error);
    }
}