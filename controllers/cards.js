const Card = require('../models/card');

module.exports = {
    index
}

async function index(req, res) {
    const cards = await Card.find({});
    res.render('cards/index', {title: 'All Cards'});
}