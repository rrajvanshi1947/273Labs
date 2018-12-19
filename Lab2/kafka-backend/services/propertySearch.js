// var { mongoose } = require("../../node-backend/db/mongoose");
var bcrypt = require('bcrypt')
var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Inside Property search request");
    console.log(body);

    Owner.find({propertydetails: {$elemMatch: {propertystartdate: {"$lte" : body.arriveDate}, propertyenddate: {"$gte" : body.departDate}, propertycity: body.city, propertyaccomodates: {$gte: body.guests}}}}, function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

        //{	"city" : "San Francisco",
	// "arriveDate" : "2018-11-05",
	// "departDate" : "2018-12-08",
	// "guests" : 4
// }
    
    
    console.log("after callback");
};

exports.handle_request = handle_request;


