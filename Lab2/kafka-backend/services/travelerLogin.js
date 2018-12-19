// var { mongoose } = require("../../node-backend/db/mongoose");
// var { mongoose } = require("../db/mongoose");
// var bcrypt = require('bcrypt')
var Traveler = require("../models/login");
// var comparePassword = require('./comparePassword')

function handle_request(body, callback) {
  console.log("Inside Traveler login request");
  console.log(body);

  Traveler.findOne({ email: body.email }, function(err, data) {
    if (err) {throw err
                callback(null, err)
    }if(!data){
        console.log('User not found');
        var reply ={success: false, message: "Authentication failed. User not found", status: 401}
        callback(null, reply)
    }
    else {
      data.comparePassword(body.password, function(err, isMatch) {
        if(isMatch){
          console.log("User authenticated to log in");
          console.log(data);
          callback(null, data);
        }
        else {
            console.log("Passwords did not match");
            var reply2 ={success: false, message: "Authentication failed. Passwords did not match", status: 401}
            callback(null, reply2)
        }
      });
    }
  });

  console.log("after callback");
}

exports.handle_request = handle_request;
