var connection =  new require('./kafka/Connection');
var { mongoose } = require("./db/mongoose")
//topics files
//var signin = require('./services/signin.js');
var travelerLogin = require('./services/travelerLogin');
var ownerLogin = require('./services/ownerLogin');
var signupTraveler = require('./services/signupTraveler');
var signupOwner = require('./services/signupOwner');
var propertySearch = require('./services/propertySearch');
var location = require('./services/location');
var details = require('./services/details');
var pricing = require('./services/pricing');
var images = require('./services/images');
var travelerMessage = require('./services/travelerMessage');
var ownerMessage = require('./services/ownerMessage');
var bookProperty = require('./services/bookProperty');
var ownerDashoard = require('./services/ownerDashoard');
var sendMessage = require('./services/sendMessage');
var profile = require('./services/profile');
var profileUpdate = require('./services/profileUpdate');
var profilePic= require('./services/profilePic');
var amenities= require('./services/amenities');
var applyBooking= require('./services/applyBooking');
var trips= require('./services/trips');

console.log('server is running ');
console.log("client ready!");
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle\n'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];

            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("traveler_login", travelerLogin)
handleTopicRequest("owner-login", ownerLogin)
handleTopicRequest("signup-traveler", signupTraveler)
handleTopicRequest("signup-owner", signupOwner)
handleTopicRequest("property-search", propertySearch)
handleTopicRequest("location", location)
handleTopicRequest("details", details)
handleTopicRequest("pricing", pricing)
handleTopicRequest("images", images)
handleTopicRequest("traveler-message", travelerMessage)
handleTopicRequest("owner-message", ownerMessage)
handleTopicRequest("book-property", bookProperty)
handleTopicRequest("owner-dashboard", ownerDashoard)
handleTopicRequest("send-message", sendMessage)
handleTopicRequest("profile", profile)
handleTopicRequest("profile-update", profileUpdate)
handleTopicRequest("profile-update", profilePic)
handleTopicRequest("amenities", amenities)
handleTopicRequest("apply-booking", applyBooking)
handleTopicRequest("trips", trips)

// var kafka = require('kafka-node')
// var Consumer = kafka.Consumer
// var client = new kafka.Client("localhost:2181")

// var mongo = require("mongodb");
// var Traveler  = require("./models/login");
// var Owner  = require("./models/owner");
// var { mongoose } = require("./db/mongoose");


// // var connection =  new require('./kafka/Connection');
// //topics files
// //var signin = require('./services/signin.js');
// var Traveler = require('./services/traveler');

// // function handleTopicRequest(topic_name,fname){
// //     //var topic_name = 'root_topic';
// //     var consumer = connection.getConsumer(topic_name);
// //     var producer = connection.getProducer();
// //     console.log('server is running ');
// //     consumer.on('message', function (message) {
// //         console.log('message received for ' + topic_name + " ", fname);
// //         console.log(JSON.stringify(message.value));
// //         var data = JSON.parse(message.value);
        
// //         fname.handle_request(data.data, function(err,res){
// //             console.log('after handle'+res);
// //             var payloads = [
// //                 { topic: data.replyTo,
// //                     messages:JSON.stringify({
// //                         correlationId:data.correlationId,
// //                         data : res
// //                     }),
// //                     partition : 0
// //                 }
// //             ];
// //             producer.send(payloads, function(err, data){
// //                 console.log(data);
// //             });
// //             return;
// //         });
        
// //     });
// // }
// // // Add your TOPICs here
// // //first argument is topic name
// // //second argument is a function that will handle this topic request
// // handleTopicRequest("post_book2",Books)


// var consumer = new Consumer(
//   client,
//   [],
//   {fromOffset: true}
// );
 
// consumer.on('message', function (message) {
//   handle_request(message);
// });
 
// consumer.addTopics([
//   { topic: 'traveler-login', partition: 0, offset: 0}
// ], () => console.log("topic traveler-login added to consumer for listening"));
 
// function handle_request(message) {
//     var data = JSON.parse(message.value);
//     Traveler.find({email: data.email}, {email: 1, password: 1}, function(err,result){
//       console.log(result);
//       var payloads = [
//                 { topic: data.replyTo,
//                     messages:JSON.stringify({
//                         correlationId:data.correlationId,
//                         data : result
//                     }),
//                     partition : 0
//                 }
//             ];
//             producer.send(payloads, function(err, data){
//                 console.log(data);
//             });
//             return
//     })

//     // var continent = new Buffer(countryMessage.key).toString('ascii');
//     // top3.continent = continent;
//     // // insert or update the top3 in the MongoDB server
//     // insertDocument(mongodb,top3, function() {
//     //   console.log("Top3 recorded in MongoDB for "+top3.continent);  
//     // });
 
// }// handleCountryMessage
