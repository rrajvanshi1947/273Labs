var Owner  = require("../models/owner");


function handle_request(body, callback){
   
    console.log("Adding images for new property");
    console.log(body);

    Owner.update({ownerid: body.id, "propertydetails.propertycity": {$exists: true}}, {$set: {"propertydetails.$.propertyimages.0": body.image0, "propertydetails.$.propertyimages.1": body.image1, "propertydetails.$.propertyimages.2": body.image2, "propertydetails.$.propertyimages.3": body.image3, "propertydetails.$.propertyimages.4": body.image4}}, {upsert:true},function(err, data){
        if(err){
        
        console.log(err);
        throw err}
        else{
            console.log(data)
        callback(null, data);
        }
        
        });

    console.log("after callback");
};

exports.handle_request = handle_request;