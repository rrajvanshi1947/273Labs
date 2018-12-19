// var { mongoose } = require("../../node-backend/db/mongoose");
// var { mongoose } = require("../db/mongoose");
// var bcrypt = require('bcrypt')
var Traveler  = require("../models/login");


function handle_request(body, callback){
   
    console.log("Inside update Traveler's profile request");
    console.log(body);

     //Checking whether the user already exists
    Traveler.update({_id: body.userid}, {$set: {firstname: body.firstname, lastname: body.lastname, email: body.email, phone: body.phone, aboutme: body.aboutme, city: body.city, country: body.country, company: body.company, school: body.school, hometown: body.hometown, languages: body.languages, gender: body.gender}}, {upsert: true}, function(err, data){
        if(err)
        throw err
         else{
            console.log(data)
        callback(null, data);
        }
        
    })
   
    
    console.log("after callback");
};

exports.handle_request = handle_request;


