const express = require('express');
const router = express.Router();
const decksCtrl = require('../controllers/decks')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/test', function(req, res) {
  res.send('testing page');
});
router.get('/', decksCtrl.index);
router.get('/new', ensureLoggedIn, decksCtrl.new);
router.get('/:id', decksCtrl.show);
router.get('/:id/edit', ensureLoggedIn, decksCtrl.edit);
router.post('/', ensureLoggedIn, decksCtrl.create);
router.delete('/:id', ensureLoggedIn, decksCtrl.delete);
router.put('/:id/edit', ensureLoggedIn, decksCtrl.update);


module.exports = router;
