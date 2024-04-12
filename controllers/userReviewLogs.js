const mongoose = require('mongoose');
const Card = require('../models/card');
const User = require('../models/user');
const UserReviewLog = require('../models/userReviewLog');

module.exports = {
    update,
    getUserReviewLog
};

async function update(req, res) {
    try {
        const userReviewLog = await UserReviewLog.findById(req.params.id);
        console.log(`before userReviewLog ${userReviewLog}`);
        userReviewLog.reviewTime.push(req.body.reviewTime);
        userReviewLog.dueTime = req.body.dueTime;
        await userReviewLog.save();

        console.log(`after userReviewLog ${userReviewLog}`);
        res.send('ok');
    } catch (error) {
        console.error(error);
    }
}

async function getUserReviewLog(req, res) {
    try {
        const card = await Card.findById(req.body.cardId);
        const currentUser = await User.findById(req.body.userId);

        let targetUserReviewLog = null;

        for (let obj of card.userReviewLog) {
            const singleUserReviewLog = await UserReviewLog.findById(obj);
            if (singleUserReviewLog.user._id.toString() === currentUser._id.toString()) {
                targetUserReviewLog = singleUserReviewLog;
                break;
            }
        }
        
        res.send(targetUserReviewLog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
