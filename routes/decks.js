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
// GET /decks/:id (show functionality) MUST be below new route
router.get('/:id', decksCtrl.show);
// GET /decks/:id/edit
router.get('/:id/edit', decksCtrl.edit);
// POST /decks
router.post('/', decksCtrl.create);
// DELETE /decks/:id
router.delete('/:id', decksCtrl.delete);
// PUT /decks
router.put('/:id/edit', decksCtrl.update);


module.exports = router;
