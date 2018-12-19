// var bcrypt = require('bcryptjs');
var crypt = require('./crypto.js');

var hashed = crypt.cryptPassword('testing123');
console.log("hashed password is "+ hashed);

if(crypt.comparePassword('test',hashed)){
    console.log("passwords match");
}
else
console.log("password didn't match");

if(crypt.comparePassword('testing123',hashed)){
    console.log("passwords match");
}
else
console.log("password didn't match");