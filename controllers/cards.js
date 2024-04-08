const Card = require('../models/card');

module.exports = {
    index,
    new: newCard
};


async function index(req, res) {
    // const cards = await Card.find({});
    res.render('cards/index', {title: 'All Cards'});
}

async function newCard(req, res) {
    res.render('cards/new', {title: 'Add a Card'});
}