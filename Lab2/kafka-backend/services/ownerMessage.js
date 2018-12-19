var Traveler  = require("../models/login");
var Owner  = require("../models/owner");

function handle_request(body, callback){
   
    console.log("Sending message to traveler");
    console.log(body);

    Owner.update({ownerid: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.messages.0": {travelerid: body.travelerid, "messages.1": body.message}}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

     Traveler.update({travelerid: body.travelerid}, {$set: {"messages": {ownerid: body.ownerid, "messages.1": body.message}}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });    

    console.log("after callback");
};

exports.handle_request = handle_request;