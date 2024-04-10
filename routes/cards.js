var express = require('express');
var router = express.Router();
var cardsCtrl = require('../controllers/cards')

// GET /cards
router.get('/', cardsCtrl.index);
// GET /cards/new
router.get('/new', cardsCtrl.new);
// GET /cards/:id/edit
router.get('/:id/edit', cardsCtrl.edit);
// POST /cards
router.post('/', cardsCtrl.create);
// DELETE /cards/:id
router.delete('/:id', cardsCtrl.delete);
// PUT /cards
router.put('/:id/edit', cardsCtrl.update);

module.exports = router;
