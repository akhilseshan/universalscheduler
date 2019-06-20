
const router = require('express').Router();
const Meeting = require('../models/meeting-model');
const mongoose = require('mongoose');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    Meeting.find({$or: [{user2: req.user.emailId},{user1: req.user.emailId}]}).then((currentMeeting) => {
        if(currentMeeting){
            //find the meetings and pass it to profile
            var details = {user_details: req.user,meeting_details: currentMeeting,meeting_count: currentMeeting.length};
            res.render('profile', { user: details });
        }
    });
});

module.exports = router;