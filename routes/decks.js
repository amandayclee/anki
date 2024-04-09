var express = require('express');
var router = express.Router();
var decksCtrl = require('../controllers/decks')

// GET /decks/test
router.get('/test', function(req, res) {
  res.send('testing page');
});
// GET /decks
router.get('/', decksCtrl.index);
// GET /decks/new
router.get('/new', decksCtrl.new);
// POST /decks
router.post('/', decksCtrl.create);
// DELETE /decks/:id
router.delete('/:id', decksCtrl.delete);

module.exports = router;
