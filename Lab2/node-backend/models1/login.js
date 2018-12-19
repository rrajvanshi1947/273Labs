var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var Trips = new mongoose.Schema({
  city: String,
  country: String,
  startdate: Date,
  enddate: Date
}) 

var Traveler = new mongoose.Schema({
    travelerid: {
        type: Number
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number
    },
    aboutme: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    company: {
      type: String
    },
    school: {
      type: String
    },
    hometown: {
      type: String
    },
    languages: {
      type: String
    },
    gender: {
      type: String
    },
    imagelocation: {
      type: String
    },
    imagelocation: {
      type: String
    },
    trips: [Trips]
    })

  //Save traveler's hashed password
  Traveler.pre('save', function(next) {
      var user = this
      if(this.isModified('password') || this.isNew){
          bcrypt.genSalt(10, function(err,salt){
              if(err){
                  return next(err)
              }
              bcrypt.hash(user.password, salt, function(err, hash){
                  if(err){
                      return next(err)
                  }
                  user.password = hash
                  next()
              })
          })
      } else{
          return next()
      }
  })

//   Compare passwords when logging in
Traveler.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    })
}
module.exports = mongoose.model('traveler', Traveler)
// module.exports = { Traveler };