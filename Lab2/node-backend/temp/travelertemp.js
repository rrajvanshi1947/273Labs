use homeapp;
db.travelers.insert([
{
	"firstname" : "Amanda",
	"lastname" : "Shaw",
	"email" : "amanda.shaw@yahoo.com",
	"password" : "$2a$04$NMQa0zw0f5SfLHR29Socsew61thas50EyPXpcyTlquUvRx.GahFKW",
	"phone" : 6692644589,
	"aboutme" : "I love moving from one place to another",
	"city" : "San Jose",
	"country" : "United States",
	"company" : "Microsoft",
	"school" : "SJSU",
	"hometown" : "San Jose",
	"languages" : "English",
	"gender" : "Female",
	"imagelocation" : "/Images/Profile/user1.jpg",
	"travelerid" : 1,
    "trips":[{city: 'Miami',country: 'United States', startdate: new Date("2018-11-20"), enddate: new Date("2018-11-25") }, {city: 'Melbourne',country: 'Australia', startdate: new Date("2018-12-01"), enddate: new Date("2018-12-05") }]
}, {"firstname" : "Raj",
	"lastname" : "Shaw",
	"email" : "raj.shaw@yahoo.com",
	"password" : "a",
	"phone" : 6692644534,
	"aboutme" : "I love moving from one place to another",
	"city" : "San Jose",
	"country" : "United States",
	"company" : "Google",
	"school" : "SJSU",
	"hometown" : "San Jose",
	"languages" : "English",
	"gender" : "Male",
	"imagelocation" : "/Images/Profile/user2.jpg",
	"travelerid" : 2,
    "trips":[{city: 'Florida',country: 'United States', startdate: new Date("2018-10-21"), enddate: new Date("2018-10-23") }]
}
])
