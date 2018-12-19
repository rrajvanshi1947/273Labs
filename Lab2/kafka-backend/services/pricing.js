var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Adding pricing details for new property");
    console.log(body);

    Owner.update({_id: body.ownerid, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.propertyminstaydays": body.minStay, "propertydetails.$.propertycostperday": body.currency, "propertydetails.$.propertystartdate": body.startDate, "propertydetails.$.propertyenddate": body.endDate}}, {upsert:true},function(err, data){
        if(err)
        console.log(err);
        else{}
        console.log(data)
        callback(null, data);
        });

    console.log("after callback");
};

exports.handle_request = handle_request;