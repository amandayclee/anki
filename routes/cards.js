var express = require('express');
var router = express.Router();
var cardsCtrl = require('../controllers/cards')

// GET /cards/
router.get('/', cardsCtrl.index);
// GET /cards/new
router.get('/new', cardsCtrl.new);

router.get('/test', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
