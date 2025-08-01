const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
name: {
type: String,
required: true,
trim: true,
},

email: {
type: String,
required: true,
unique: true,
lowercase: true,
},

avatar: {
type: String, // Optional avatar image URL
default: '',
},

createdAt: {
type: Date,
default: Date.now,
},
});