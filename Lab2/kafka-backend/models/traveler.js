// var mongoose =require('mongoose');
var { mongoose } = require("../db/mongoose");

var Trips = new mongoose.Schema({
  travelerid: String,
  ownerid: String,
  tripStartDate: Date,
  tripEndDate: Date,
  tripGuests: Number,
  tripCity: String
})

var Traveler = mongoose.model(
  "traveler",
  {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number
    },
    aboutme: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    company: {
      type: String
    },
    school: {
      type: String
    },
    hometown: {
      type: String
    },
    languages: {
      type: String
    },
    gender: {
      type: String
    },
    imagelocation: {
      type: String
    },
    trips: [Trips]
  },
  "traveler"
);

module.exports = { Traveler };

// "_id" : ObjectId("5bc1cde399a2f7c8391263bd"),
// 	"firstname" : "Amanda",
// 	"lastname" : "Shaw",
// 	"email" : "amanda.shaw@yahoo.com",
// 	"password" : "$2a$04$NMQa0zw0f5SfLHR29Socsew61thas50EyPXpcyTlquUvRx.GahFKW",
// 	"phone" : 6692644589,
// 	"aboutme" : "I love moving from one place to another",
// 	"city" : "San Jose",
// 	"country" : "United States",
// 	"company" : "Google",
// 	"school" : "SJSU",
// 	"hometown" : "San Jose",
// 	"languages" : "English",
// 	"gender" : "Female",
// 	"imagelocation" : "/Images/Profile/user1.jpg"
