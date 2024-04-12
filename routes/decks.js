var express = require('express');
var router = express.Router();
var decksCtrl = require('../controllers/decks')
var ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /decks/test
router.get('/test', function(req, res) {
  res.send('testing page');
});
// GET /decks
router.get('/', decksCtrl.index);
// GET /decks/new
router.get('/new', ensureLoggedIn, decksCtrl.new);
// GET /decks/:id (show functionality) MUST be below new route
router.get('/:id', decksCtrl.show);
// GET /decks/:id/edit
router.get('/:id/edit', ensureLoggedIn, decksCtrl.edit);
// POST /decks
router.post('/', ensureLoggedIn, decksCtrl.create);
// DELETE /decks/:id
router.delete('/:id', ensureLoggedIn, decksCtrl.delete);
// PUT /decks
router.put('/:id/edit', ensureLoggedIn, decksCtrl.update);


module.exports = router;
