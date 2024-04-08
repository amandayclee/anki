var express = require('express');
var router = express.Router();
var cardsCtrl = require('../controllers/cards')

// GET /cards
router.get('/', cardsCtrl.index);
// GET /cards/new
router.get('/new', cardsCtrl.new);
// POST /cards
router.post('/', cardsCtrl.create);

module.exports = router;
