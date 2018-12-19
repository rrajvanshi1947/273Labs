var Traveler = require("../models/login");
var traveler = new Traveler()
//   Compare passwords when logging in
module.exports  = traveler.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    })
}

