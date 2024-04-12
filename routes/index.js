var express = require('express');
var router = express.Router();
const passport = require('passport');
const Card = require('../models/card');
const UserReviewLog = require('../models/userReviewLog');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/decks');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/initial',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

// After successful Google OAuth authentication
router.get('/initial', async function(req, res) {

  const cards = await Card.find({});

  // Initialize user review logs for each card
  for (let card of cards) {
    const cardObj = await Card.findById(card);
    let exist = null;
    if (cardObj.userReviewLog.length > 0) {
      for (let reviewLoginACard of cardObj.userReviewLog) {
        const review = await UserReviewLog.findById(reviewLoginACard);
        if (review.user._id.toString() === req.user._id.toString()) {
          exist = true;
          break;
        };
      }
      if (!exist) {
        const newUserReviewLog = await UserReviewLog.create({ user: req.user._id, reviewTime: [], dueTime: null });
        cardObj.userReviewLog.push(newUserReviewLog);
        await cardObj.save();
      }
    } else {
      const newUserReviewLog = await UserReviewLog.create({ user: req.user._id, reviewTime: [], dueTime: null });
      cardObj.userReviewLog.push(newUserReviewLog);
      await cardObj.save();
    }
  }
  // Redirect or render appropriate view
  res.redirect('/');
});

module.exports = router;

