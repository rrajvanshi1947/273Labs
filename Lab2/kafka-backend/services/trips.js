var Traveler = require("../models/login");

function handle_request(body, callback) {
  console.log("Getting traveler trips");
  console.log(body);

  Traveler.find({ _id: body.userid }, {trips: 1}, function(err, data) {
    if (err) {throw err
                // callback(null, err)
    }
    else {
        console.log(data.trips);
      callback(null,data)
        }
        // else {
        //     console.log("Passwords did not match");
        //     var reply2 ={success: false, message: "Authentication failed. Passwords did not match", status: 401}
        //     callback(null, reply2)
        // }
      });
      console.log("after callback");
    }
  

exports.handle_request = handle_request;
