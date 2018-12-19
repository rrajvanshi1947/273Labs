var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Adding more details for new property");
    console.log(body);

    Owner.update({_id: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.floorarea": body.floorarea, "propertydetails.$.meals": body.meals, "propertydetails.$.houserules": body.houserules, "propertydetails.$.locationtype": body.locationtype, "propertydetails.$.theme": body.theme, "propertydetails.$.general": body.general, "propertydetails.$.kitchen": body.kitchen, "propertydetails.$.dining": body.dining, "propertydetails.$.outside": body.outside, "propertydetails.$.attractions": body.attractions, "propertydetails.$.entertainment": body.entertainment, "propertydetails.$.suitability": body.suitability, "propertydetails.$.leisureactivities": body.leisureactivities, "propertydetails.$.localservices": body.localservices}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

    console.log("after callback");
};

exports.handle_request = handle_request;