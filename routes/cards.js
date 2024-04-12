var express = require('express');
var router = express.Router();
var cardsCtrl = require('../controllers/cards')
var ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /cards
router.get('/', cardsCtrl.index);
// GET /cards/new
router.get('/new', ensureLoggedIn, cardsCtrl.new);
// GET /cards/:id/edit
router.get('/:id/edit', ensureLoggedIn, cardsCtrl.edit);
// POST /cards
router.post('/', ensureLoggedIn, cardsCtrl.create);
// DELETE /cards/:id
router.delete('/:id', ensureLoggedIn, cardsCtrl.delete);
// PUT /cards
router.put('/:id/edit', ensureLoggedIn, cardsCtrl.update);

module.exports = router;
