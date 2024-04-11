var express = require('express');
var router = express.Router();
var userReviewLogsCtrl = require('../controllers/userReviewLogs')


// POST /userReviewLogs
router.post('/', userReviewLogsCtrl.getUserReviewLog);

// PUT /userReviewLogs/:id/edit
router.put('/:id/edit', userReviewLogsCtrl.update);

module.exports = router;
