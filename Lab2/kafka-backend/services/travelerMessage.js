var Traveler  = require("../models/login");
var Owner  = require("../models/owner");

function handle_request(body, callback){
   
    console.log("Sending message to property owner");
    console.log(body);

    Owner.update({ownerid: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.messages.0": {travelerid: body.travelerid, "messages.0": body.message}}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

     Traveler.update({travelerid: body.travelerid}, {$set: {"messages.0": {"messages.0": body.message, ownerid: body.ownerid}}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });    

    console.log("after callback");
};

exports.handle_request = handle_request;