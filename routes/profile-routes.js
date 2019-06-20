
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
    Meeting.find({user2: req.user.emailId}).then((currentMeeting) => {
        if(currentMeeting){
            // if database has a meeting with user id
            console.log('meeting ', currentMeeting,currentMeeting.length);
            for(var i=0;i<currentMeeting.length;i++) {
                console.log(currentMeeting[i]);
            }
        }
    });
    res.render('profile', { user: req.user });
});

module.exports = router;