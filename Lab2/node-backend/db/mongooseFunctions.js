var log = require('../logger')(module)
var Traveler  = require("../models/login");
var Owner  = require("../models/owner");
var { mongoose } = require("./mongoose");
log.level = process.env.LOGLEVEL || 'info'

//Property search by traveler based on 4 criteria
// Owner.find({propertydetails: {$elemMatch: {propertystartdate: {"$lte" : ISODate("2018-11-05T0:00:00Z")}, propertyenddate: {"$gte" : ISODate("2018-11-10T10:03:46Z")}, propertycity: 'San Francisco', propertyaccomodates: {$gte: 3}}}})

// //Update user profile
// Traveler.update({travelerid: 1}, {$set: {"firstname" : "Amanda",
// 	"lastname" : "Shaw",
// 	"email" : "amanda.shaw@yahoo.com",
// 	"phone" : 6692644589,
// 	"aboutme" : "I love moving from one place to another",
// 	"city" : "San Jose",
// 	"country" : "United States",
// 	"company" : "Microsoft",
// 	"school" : "SJSU",
// 	"hometown" : "San Jose",
// 	"languages" : "English",
// 	"gender" : "Female",
// }})

// //Get traveler trips
// Traveler.find({travelerid: 1}, {trips: 1})

// //Owner Dashboard

// //New user sign up: Traveler
// Traveler.insert({firstname: "", lastname: "", email: "", password: ""})

// //New user sign up: Owner
// Owner.insert({firstname: "", lastname: "", email: "", password: ""})

// //Insert initial property details
// Owner.update({ownerid: 1, propertydetails: {$elemMatch: {propertyid: 1}}}, {propertycountry: "", propertyaddress: "", propertyunit: "", propertycity: "", propertystate: "", propertyzipcode: ""})

function dbfind(collection, query, callback){
	console.log(typeof(collection));
	collection.find(query, {}, function(err, data) {
	// log.info(data)	
	if(err){
		log.error('Unable to execute query. Error: ' + err)
	}else{
		log.debug('Data received: ' + data)
		callback(err, data)
	}

	}) 
}

function dbupdate(collection, query, newData, callback) {
	// var coll = new collection(query)
	console.log(typeof(collection));
	collection.findOneAndUpdate(query, newData, {upsert:true}, function(err, data) {
		if(err){
		log.error('Unable to execute query. Error: ' + err)
	}else{
		log.debug('Data updated: ' + data)
		callback(err, data)
	}
	})
}

//Error

function dbsave(collection, query, callback) {
	var coll = new collection(query)
	console.log(typeof(collection));
	coll.save( function (err, data) {
		if(err){
		log.error('Unable to execute query. Error: ' + err)
	}else{
		log.debug('Data saved: ' + data)
		callback(err, data)
	}
	})
}

// ===============================================================================
// log.level = 'debug'
// dbfind(Traveler, {"travelerid" : 1}, function(err, data) {
// 	log.info(data)
// })
// log.info('Value is:' + 
// a);


//For testing insert and update
// var myTraveler = mongoose.model('traveler')
// var query2 =  {travelerid: 4}
// var newData = {travelerid: 5}
// dbupdate(myTraveler, query2, newData, function(err, data) {
// 	log.info(data)
// })
// dbsave(myTraveler, {
// 	"firstname" : "Simran",
// 	"lastname" : "Kaur",
// 	"email" : "simkaur@yahoo.com",
// 	"password" : "a",
// 	"phone" : 6692644543,
// 	"aboutme" : "I love moving from one place to another",
// 	"city" : "San Jose",
// 	"country" : "United States",
// 	"company" : "Google",
// 	"school" : "SJSU",
// 	"hometown" : "San Jose",
// 	"languages" : "English",
// 	"gender" : "Male",
// 	"imagelocation" : "/Images/Profile/user3.jpg",
// 	"travelerid" : 4,
// 	"trips" : [
// 		{
// 			"city" : "Florida",
// 			"country" : "United States",
// 			"startdate" : new Date("2018-10-21T00:00:00Z"),
// 			"enddate" : new Date("2018-10-23T00:00:00Z")
// 		}
// 	]

// 	}, function(err, data) {
// 	log.info(data)
// })

// dbupdate(Traveler, {query}, callback)