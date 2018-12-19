var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Adding booking details for property");
    console.log(body);

    Owner.update({ownerid: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$push: {"propertydetails.$.propertyupcomingbookings": {travelerid: body.travelerid, firstname: body.firstname, lastname: body.lastname, bookingstartdate: body.bookingstartdate, bookingenddate: body.bookingenddate, guests: body.guests}}}, {upsert:true}, function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

    console.log("after callback");
};

exports.handle_request = handle_request;