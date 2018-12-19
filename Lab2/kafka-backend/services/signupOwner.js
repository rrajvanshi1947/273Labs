// var { mongoose } = require("../../node-backend/db/mongoose");
// var { mongoose } = require("../db/mongoose");
// var bcrypt = require('bcrypt')
var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Inside new Owner creation request");
    console.log(body);

     //Checking whether the user already exists
    Owner.find({email: body.email}, function(err, data){
        if(err){
        throw err
                // callback(null, err)
        // console.log(reply);
        }
        // check = data
        if(data.length){
        console.log('User already exists');
        callback(null, 'User already exists')
        }
    })
    // $push: {propertyupcomingbookings: {travelerid: 'a', firstname: 'a',  lastname: 'a',  bookingstartdate: 'a',  bookingenddate: 'a',  guests: '3'}}
    // , "propertydetails.0": {propertycity: "x"}

    var Own = new Owner({firstname: body.firstname, lastname: body.lastname, email: body.email, password: body.password, travelerid: body.id})
    Own.save(function(err, data){
        if(err){
        throw err
                callback(null, err)
        // console.log(reply);
        }
        else{
        console.log('User created successfully\n');
        console.log(data);
        callback(null, data)
    }
    })
    console.log("after callback");
};

exports.handle_request = handle_request;


