var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Adding further details for new property");
    console.log(body);
    //  headline = req.body.headline;
//   var propertyDescription = req.body.propertyDescription;
//   var propertyType = req.body.propertyType;
//   var bedrooms = req.body.bedrooms;
//   var accomodates = req.body.accomodates;
//   var bathrooms = 

    Owner.update({_id: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.propertyheadline": body.headline, "propertydetails.$.propertydescription": body.propertyDescription, "propertydetails.$.propertytype": body.propertyType, "propertydetails.$.propertybedrooms": body.bedrooms, "propertydetails.$.propertyaccomodates": body.accomodates, "propertydetails.$.propertybathrooms": body.bathrooms}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

    console.log("after callback");
};

exports.handle_request = handle_request;


// {	"headline" : "This is headline",
// 	"propertyType" : "Villa",
// 	"propertyDescription" : "This is a wonderful property",
// 	"bedrooms" : 3,
// 	"bathrooms": 2,
// 	"accomodates": 8,
// 	"id": 3
// }var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Adding further details for new property");
    console.log(body);
    //  headline = req.body.headline;
//   var propertyDescription = req.body.propertyDescription;
//   var propertyType = req.body.propertyType;
//   var bedrooms = req.body.bedrooms;
//   var accomodates = req.body.accomodates;
//   var bathrooms = 

    Owner.update({_id: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.propertyheadline": body.headline, "propertydetails.$.propertydescription": body.propertyDescription, "propertydetails.$.propertytype": body.propertyType, "propertydetails.$.propertybedrooms": body.bedrooms, "propertydetails.$.propertyaccomodates": body.accomodates, "propertydetails.$.propertybathrooms": body.bathrooms}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

    console.log("after callback");
};

exports.handle_request = handle_request;


// {	"headline" : "This is headline",
// 	"propertyType" : "Villa",
// 	"propertyDescription" : "This is a wonderful property",
// 	"bedrooms" : 3,
// 	"bathrooms": 2,
// 	"accomodates": 8,
// 	"id": 3
// }