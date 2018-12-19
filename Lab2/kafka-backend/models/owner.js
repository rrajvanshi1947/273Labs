var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var Messages = new mongoose.Schema({
    "travelerid": Number,
    "messages": [String]
})

var PropertyDetails = new mongoose.Schema({ 
            "propertyimages": [String],
			"propertyaccomodates" : Number,
			"propertyaddress" : String,
			"propertyareasqft" : Number,
			"propertyattractions" : String,
			"propertybathrooms" : Number,
			"propertybedrooms" : Number,
			"propertycity" : String,
			"propertycostperday" : String,
			"propertycountry" : String,
			"propertycurrency" : String,
			"propertydescription" : String,
			"propertydining" : String,
			"propertyenddate" : Date,
			"propertyentertainment" : String,
			"propertygeneral" : String,
			"propertyheadline" : String,
			"propertyhouserules" : String,
			"propertyid" : Number,
			"propertykithcen" : String,
			"propertyleisureactivities" : String,
			"propertylocalservicesbusinesses" : String,
			"propertylocationtype" : String,
			"propertymeals" : String,
			"propertyminstay" : Number,
			"propertyminstaydays" : Number,
			"propertyname" : String,
			"propertyoutside" : String,
			"propertystartdate" : Date,
			"propertystate" : String,
			"propertysuitability" : String,
			"propertytheme" : String,
			"propertytype" : String,
			"propertyunit" : String,
			"propertyzipcode" : Number,
			"propertypreviousbookings":[Object],
            "propertyupcomingbookings":[Object],
            "messages": [Messages],
            meals: String,
      floorarea: Number,
      houserules: String,
      locationtype: String,
      theme: String,
      general: String,
      kitchen: String,
      dining: String,
      outside: String,
      attractions: String,
      entertainment: String,
      suitability: String,
      leisureactivities: String,
      localservices: String
		})

var Owner = new mongoose.Schema({
    ownerid: {
        type: Number,
        unique: true
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
    city: {
      type: String
    },
    address: {
      type: String 
    },
    zipcode: {
        type: Number
    },
    imagelocation: {
      type: String
    },
    ownerid: {
        type: Number
    },
    propertydetails: [PropertyDetails]
    })

  //Save owner's hashed password
  Owner.pre('save', function(next) {
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
Owner.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    })
}
module.exports = mongoose.model('owners', Owner)

