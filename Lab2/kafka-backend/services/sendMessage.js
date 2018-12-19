var Owner = require("../models/owner");
var Traveler = require("../models/login");
var Message = require('../models/messages')
var dbcall = require('../db/mongooseFunctions')

function handle_request(body, callback) {
  console.log("Sending message");
  console.log(body);

   dbcall.dbsave(Message, body, function(err, result){
       callback(null, result)
   }) 
//   Message.find({ _id: body.ownerid }, function(err, data) {
//     if (err) {throw err
//                 // callback(null, err)
//     }
    // if(!data){
    //     console.log('User not found');
    //     var reply ={success: false, message: "Authentication failed. User not found", status: 401}
    //     callback(null, reply)
    // // }
    // else {
    //   callback(null,data)
    //     }
        // else {
        //     console.log("Passwords did not match");
        //     var reply2 ={success: false, message: "Authentication failed. Passwords did not match", status: 401}
        //     callback(null, reply2)
        // }
        console.log("after callback");
      };
      
    
  

exports.handle_request = handle_request;
