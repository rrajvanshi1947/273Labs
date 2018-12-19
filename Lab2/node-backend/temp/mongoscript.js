use homeapp;

var startdate = new Date('2018-11-20')
db.owners.insert({
	"firstname" : "Christine",
	"lastname" : "Sanders",
	"email" : "christine.sandes@gmail.com",
	"password" : "$2a$04$NMQa0zw0f5SfLHR29Socsew61thas50EyPXpcyTlquUvRx.GahFKW",
	"phone" : 6692644585,
	"city" : "San Jose",
	"address" : "21 Baker Street",
	"zipcode" : "95110",
	"imagelocation" : "NULL",
	"ownerid" : 1,
	"propertydetails" : [
		{   
            "propertyimages": [' photo1538864571869.png','photo1538864571873.png','photo1538864571880.png','photo1538864571883.png','photo1538864571887.png'],
			"propertyaccomodates" : 4,
			"propertyaddress" : "4th and San Fernando",
			"propertyareasqft" : 750,
			"propertyattractions" : "Cinemas Health/beauty Spa Playground and Restaurants ",
			"propertybathrooms" : 2,
			"propertybedrooms" : 3,
			"propertycity" : "San Francisco",
			"propertycostperday" : "$300",
			"propertycountry" : "United States",
			"propertycurrency" : "$",
			"propertydescription" : "Experience luxury and solitude in this loft right on Santana Row, with easy access to shops and restaurants right below you. The Row has become a magnet for both locals and out-of-towners.",
			"propertydining" : "Dining Area",
			"propertyenddate" : new Date("2018-12-31"),
			"propertyentertainment" : "DVD Player Satellite / Cable and Television",
			"propertygeneral" : "Air Conditioning, Clothes Dryer, Internet, Living Room and Parking",
			"propertyheadline" : "Welcome to Avalon Apartments",
			"propertyhouserules" : "Check-in: 3:00 PM / Check-out: 11:00 AM",
			"propertyid" : 1,
			"propertykithcen" : "Coffee Maker Dishes & Utensils Dishwasher Kitchen and Microwave",
			"propertyleisureactivities" : "Photography and Shopping",
			"propertylocalservicesbusinesses" : "ATM/Bank",
			"propertylocationtype" : "Sub-urban",
			"propertymeals" : "Guests provide their own meals",
			"propertyminstay" : 4,
			"propertyminstaydays" : 2,
			"propertyname" : "Avalon Apartments",
			"propertyoutside" : "Patio",
			"propertystartdate" : new Date("2018-11-01"),
			"propertystate" : "California",
			"propertysuitability" : "Short-term Renters Welcome",
			"propertytheme" : "Family",
			"propertytype" : "Apartment",
			"propertyunit" : "Apartment",
			"propertyzipcode" : 95112,
			"propertypreviousbookings":[{"propertybookingenddate" : new Date("2018-11-25"),
			"propertybookingstartdate" : startdate,
			"travelerid" : 1}]
		}
	]
}
)