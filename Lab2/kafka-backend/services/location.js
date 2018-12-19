var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Inside posting property request");
    console.log(body);

    Owner.update({_id: body.ownerid}, {$set: {"propertydetails.0": {propertyunit: body.unit, propertycity: body.city, propertystate: body.state, propertycountry: body.country, propertyzipcode: body.zipcode, propertyaddress: body.streetAddress}}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

    console.log("after callback");
};

exports.handle_request = handle_request;


// {"unit" : "House 46",
// 			"city" : "Santa Clara",
// 			"state" : "California",
// 			"country" : "United States",
// 			"zipcode" : 95784,
// 			"streetAddress" : "ajbdjqwdfqk s2"
// }