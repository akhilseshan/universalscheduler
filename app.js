const express = require('express');
const authRoutes = require('./routes/auth_routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const Meeting = require('./models/meeting-model');

const app = express();

//set up view engine
app.set('view engine','ejs');

//cookie
app.use(cookieSession({
    maxAge: 24*60*60*100,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,() => {
    console.log('connected to mongodb');
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up auth routes
app.use('/auth',authRoutes);

//set up profile routes
app.use('/profile',profileRoutes);

//create home route
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
});

//add a meeting to the database
app.post('/addmeeting',(req,res) => {
    var localuser1 = req.user.emailId;
    var localuser2 = req.body.user2;
    var localtime = new Date();

    new Meeting({
        user1: localuser1,
        user2: localuser2,
        time: localtime,
        status: "pending"
    }).save().then((newMeeting) => {
        //created new meeting
        //console.log('created new meeting: ', newMeeting);
    });
    //redirect back to profile page
    res.redirect('/profile');
});

//update meetings in the database
app.post('/updatemeeting',(req,res) => {
    //get the value from form in the html page
    var statusValue = JSON.parse(req.body.statusbutton);
    if(statusValue.val == 1) {
        //if the user press accept button
        console.log('accepted '+statusValue.id);
        Meeting.updateOne({_id: statusValue.id}, {$set: {status: "accepted"}}, (err,res) => {
            console.log('updated successfully');
        });
    }else{
        //if the user press reject button
        console.log('rejected '+statusValue.id);
        Meeting.updateOne({_id: statusValue.id}, {$set: {status: "rejected"}}, (err,res) => {
            console.log('updated successfully');
        });
    }
    //redirect back to profile page
    res.redirect('/profile');
});

app.listen(3000,() => {
    console.log('app now listening on port 3000');
    
})