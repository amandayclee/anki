const express = require('express');
const router = express.Router();
const userReviewLogsCtrl = require('../controllers/userReviewLogs')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, userReviewLogsCtrl.getUserReviewLog);
router.put('/:id/edit', ensureLoggedIn, userReviewLogsCtrl.update);

module.exports = router;
