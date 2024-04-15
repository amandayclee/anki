const express = require('express');
const router = express.Router();
const cardsCtrl = require('../controllers/cards')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', cardsCtrl.index);
router.get('/new', ensureLoggedIn, cardsCtrl.new);
router.get('/:id/edit', ensureLoggedIn, cardsCtrl.edit);
router.post('/', ensureLoggedIn, cardsCtrl.create);
router.delete('/:id', ensureLoggedIn, cardsCtrl.delete);
router.put('/:id/edit', ensureLoggedIn, cardsCtrl.update);

module.exports = router;
