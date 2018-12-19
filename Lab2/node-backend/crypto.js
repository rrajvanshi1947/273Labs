var bcrypt = require('bcryptjs');

exports.cryptPassword = function(password) {
    var phash = bcrypt.hashSync(password,4);
    return phash;
};

//The hash password already has the salt to use in order to compare the plain password
exports.comparePassword = function(plainPass, hashword) {
   var result = bcrypt.compareSync(plainPass,hashword)
        return result;    
};
