const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for storing meeting details
const meetingSchema = new Schema({
    user1: String,
    user2: String,
    startTime: Date,
    endTime: Date,
    status: String
});

const Meeting = mongoose.model('meeting',meetingSchema);

module.exports = Meeting;