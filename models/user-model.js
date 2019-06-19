const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for storing user details
const userSchema = new Schema({
    username: String,
    googleId: String,
    emailId: String
});

const User = mongoose.model('user',userSchema);

module.exports = User;