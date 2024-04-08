const Card = require('../models/card');

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
    res.render('cards/new', { title: 'Add a Card', msg: ''});
}

async function create(req, res) {
    try {
        console.log(req.body);
        const newCard = new Card(req.body);
        await newCard.save();
        res.render('cards/new', { title: 'Add a Card', msg: 'Successfully Added!' });
    } catch (error) {
        res.render('cards/new', { title: 'Add a Card', msg: error }) //render file path
    }
}