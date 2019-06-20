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
    var localtime = new Date().toUTCString;

    new Meeting({
        user1: localuser1,
        user2: localuser2,
        time: localtime,
        accepted: 0
    }).save().then((newMeeting) => {
        console.log('created new meeting: ', newMeeting);
    });
});

app.listen(3000,() => {
    console.log('app now listening on port 3000');
    
})