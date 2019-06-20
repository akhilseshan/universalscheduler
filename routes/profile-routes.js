
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
            //console.log(curr,curr[0].user1);
            //console.log('values in curr'+currentMeeting);
            var details = {user_details: req.user,meeting_details: currentMeeting,meeting_count: currentMeeting.length};
            //console.log(details);
            res.render('profile', { user: details });
            // if database has a meeting with user id
            //console.log('meeting ', currentMeeting,currentMeeting.length);
            //for(var i=0;i<currentMeeting.length;i++) {
            //    console.log(currentMeeting[i].time+new Date().getTimezoneOffset());
            //}
        }
    });
});

module.exports = router;