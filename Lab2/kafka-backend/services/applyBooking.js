var Owner  = require("../models/owner");
var Traveler  = require("../models/login");

function handle_request(body, callback){
   
    console.log("Booking property for traveler");
    console.log(body);

    Traveler.findOneAndUpdate({_id: body.travelerid}, {$push: {"trips" : {tripStartDate: body.travelerStartDate, tripEndDate: body.travelerDepartDate, tripGuests: body.travelerGuests, ownerid: body.ownerid, tripCity: body.city}}}, {upsert:true},function(err, data){
        if(err){
        
        console.log(err);
        throw err}
        else{
            console.log(data)
            console.log('Updated booking details in traveler profile')

        Owner.update({_id: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.propertyupcomingbookings.0": {travelerid: body.travelerid, firstname: data.firstname, lastname: data.lastname, bookingstartdate: body.travelerStartDate, bookingenddate: body.travelerDepartDate, guests: body.travelerGuests}}}, {upsert:true}, function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log('Updated booking details in owner profile')
        // callback(null, data);
        });

        callback(null, data);
        }
        
        });

        

    console.log("after callback");
};

exports.handle_request = handle_request;