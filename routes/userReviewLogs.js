var express = require('express');
var router = express.Router();
var userReviewLogsCtrl = require('../controllers/userReviewLogs')
var ensureLoggedIn = require('../config/ensureLoggedIn');


// POST /userReviewLogs
router.post('/', ensureLoggedIn, userReviewLogsCtrl.getUserReviewLog);

// PUT /userReviewLogs/:id/edit
router.put('/:id/edit', ensureLoggedIn, userReviewLogsCtrl.update);

module.exports = router;
