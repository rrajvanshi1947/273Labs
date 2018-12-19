//import the require dependencies
var express = require("express");
const multer = require("multer");
var Owner = require("../kafka-backend/models/owner");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './uploads/')
//   },
//   filename: function(req, file, cb){
//     cb(null, file.originalname) //new Date().toISOString()+
//   }
// })
// //req.file.path to get path to be stored in imageLocation:

// //doc.image   to return
// const fileFilter1 = (req, file, cb)=>{
//   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
//   cb(null, true)
//   else
//   cb(null, false)
// }

// const upload = multer({storage: storage, fileFilter1: fileFilter1})

var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
// const bcrypt = require('bcrypt');

//import jwt, passport, morgan
const jwt = require("jsonwebtoken");
var passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
var config = require("./secret/secret");
var morgan = require("morgan");
var mongoose = require("mongoose");
mongoose.set("debug", true);
//import local files
var pool = require("./pool");
var crypt = require("./crypto");

var mongo = require("mongodb");
var Traveler = require("./models/login");
var Owner = require("./models/owner");
var { mongoose } = require("./db/mongoose");

//import kafka
var kafka = require("./kafka/client");
// var kafka2 = require('./kafka/client2');
require("./passport")(passport);

var app = express();
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Initialize passport
app.use(passport.initialize());

app.use("/uploads", express.static("uploads"));
//use express session to maintain session data
app.use(
  session({
    secret: "MySession",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const multerConfig = {
  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({
    //specify destination
    destination: function(req, file, next) {
      next(null, "./build/Images");
    },

    //specify the filename to be unique
    filename: function(req, file, next) {
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split("/")[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.fieldname + Date.now() + "." + ext);
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }

    // only permit image mimetypes
    const image = file.mimetype.startsWith("image/");
    if (image) {
      console.log("photo uploaded");
      next(null, true);
    } else {
      console.log("file not supported");
      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer.arguments(multerConfig));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(
  "/",
  express.static(path.join(__dirname, "./build/Images/"))
);

// app.post("/traveler-login", (req, res) => {
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log("Email: ", email + "\nPassword: ", password);
//   Traveler.findOne({ email: email }, {email: 1, password: 1}, function(err, data) {
//     if (err) {
//       res.value = "Unable to connect to database";
//       console.log(res.value);
//       res.sendStatus(400).end();
//     } else if (data == null) {
//       res.body =
//         "The email you entered does not exist. Please double-check and try again.";
//       console.log(
//         "Unable to find user details using " + email + " and " + password
//       );
//       res.status(401).send(
//         'The email and password you entered did not match our records. Please double-check and try again.')
//     } else {
//       data.comparePassword(password, function(err, isMatch) {
//         if(isMatch && !err){
//           jwt.sign({data}, config.secret, { expiresIn: '300s' }, (err, token) =>{
//         res.json({token})
//         console.log("Token: ", token);
//         })
//         console.log(data);
//       console.log("Login successful and JWT token sent: ");
//       }else{
//         res.send({success: false, message: 'Authentication failed. Passwords did not match'})
//       }

//       })
//     }
//   });
// });

// app.post("/uploads", upload.single('image'), function(req, res, next) {
// console.log(req.file);
//     kafka.make_request('profile-update', req.file, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             // res.json({
//             //     // err, status: 401
//             // })
//             res.status(401)
//         }else{
//           var a = [results]
//                 res.send(a)
//                 res.end();
//                 res.status(202)

//             }

//     });
// });

app.post("/signup-traveler", function(req, res) {
  kafka.make_request("signup-traveler", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else if (results.email === req.body.email) {
      res.status(202);
      res.cookie("user", results._id, {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      res.cookie("usertype", "traveler", {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      jwt.sign(
        { results },
        config.secret,
        { expiresIn: "300s" },
        (err, token) => {
          res.json({ success: true, token: "JWT" + token, results });
          console.log("Token: ", token);
        }
      );
    } else {
      res.json({ status: 401 });
    }
  });
});

app.post("/signup-owner", function(req, res) {
  kafka.make_request("signup-owner", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else if (results.email === req.body.email) {
      res.status(202);
      res.cookie("user", results._id, {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      res.cookie("usertype", "owner", {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      jwt.sign(
        { results },
        config.secret,
        { expiresIn: "300s" },
        (err, token) => {
          res.json({ success: true, token: "JWT" + token, results });
          console.log("Token: ", token);
        }
      );
    } else {
      res.json({ status: 401 });
    }
  });
});

app.post("/owner-login", function(req, res) {
  kafka.make_request("owner-login", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else if (req.body.email === results.email) {
      res.cookie("user", results._id, {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      res.cookie("usertype", "owner", {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      res.status(202);
      jwt.sign(
        { results },
        config.secret,
        { expiresIn: "300s" },
        (err, token) => {
          res.json({ success: true, token: "JWT" + token, results });
          console.log("Token: ", token);
        }
      );
    } else {
      res.json({ status: 401 });
    }
  });
});

app.post("/traveler-login", function(req, res) {
  kafka.make_request("traveler_login", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else if (req.body.email === results.email) {
      res.cookie("user", results._id, {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      res.cookie("usertype", "traveler", {
        maxAge: 9000000,
        httpOnly: false,
        path: "/"
      });
      res.status(202);
      jwt.sign(
        { results },
        config.secret,
        { expiresIn: "300s" },
        (err, token) => {
          res.json({ success: true, token: "JWT" + token, results });
          console.log("Token: ", token);
        }
      );
    } else {
      // res.status(401)
      res.json({ status: 401 });
    }
  });
});

// app.post('/signup-traveler', function(req, res){
//     kafka.make_request('signup-traveler', req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                  status:"error",
//                 msg:"System Error, Try Again."
//             })
//         }else if(results.email === req.body.email){
//               res.status(202)
//           jwt.sign({results}, config.secret, { expiresIn: '300s' }, (err, token) =>{
//         res.json({success:true, token: 'JWT' + token, results})
//         console.log("Token: ", token);
//             })}
//     else{
//                 res.json({status: 401})
//             }
// })});

// app.post('/owner-login', function(req, res){
//     kafka.make_request('owner-login', req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                 status:"error",
//                 msg:"System Error, Try Again."
//             })
//         }else{
//                 res.json(results)
//                 res.end();
//             }

//     });
// });

// app.post("/owner-login", (req, res) => {
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log("Email: ", email + "\nPassword: ", password);
//   Owner.findOne({ email: email, password: password }, {email: 1, password: 1}, function(err, data) {
//     if (err) {
//       res.value = "Unable to connect to database";
//       console.log(res.value);
//       res.sendStatus(400).end();
//     } else if (data == null) {
//       res.body =
//         "The email you entered does not exist. Please double-check and try again.";
//       console.log(
//         "Unable to find user details using " + email + " and " + password
//       );
//       res.status(401).send(
//         'The email and password you entered did not match our records. Please double-check and try again.')
//     } else {
//       data.comparePassword(password, function(err, isMatch) {
//         if(isMatch && !err){
//           jwt.sign({data}, config.secret, { expiresIn: '300s' }, (err, token) =>{
//         res.json({token})
//         console.log("Token: ", token);
//         })
//         console.log(data);
//       console.log("Login successful and JWT token sent");
//       }else{
//         res.send({success: false, message: 'Authentication failed. Passwords did not match'})
//       }

//       })
//     }
//   });
// });

//Post messages
app.post("/send-message", function(req, res) {
  kafka.make_request("send-message", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      res.send("Message sent");
      // res.json(results)
      // res.end();
    }
  });
});

//Route to handle search request
app.post("/search", function(req, res) {
  kafka.make_request("property-search", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

//Route to book property
app.post("/apply-booking", function(req, res) {
  kafka.make_request("apply-booking", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      res.json({ results, value: 100 });
      res.end();
    }
  });
});

// app.post("/search", function(req, res) {
//   console.log("Inside Property search request");
//   var city = req.body.city;
//   var startDate = req.body.arriveDate;
//   var endDate = req.body.departDate;
//   // console.log(`User provided password: ${password}`);
//   var sql =
//     "SELECT * FROM property inner join propertyimages on property.id = propertyimages.propertyid WHERE city = " +
//     mysql.escape(city) +
//     "AND startDate <= " +
//     mysql.escape(startDate) +
//     "AND endDate >= " +
//     mysql.escape(endDate) +
//     ";";
//   // + mysql.escape(city)  + ";"
//   // "and password = " +
//   // mysql.escape(password);
//   // + ", date_format(startDate, '%Y %M %D') as startDate < " + mysql.escape(startDate) + ";"

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid search");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "application/json"
//           });
//           console.log(result);
//           // console.log('\n\n\n\n\n\n\n');
//           // console.log('Trip Start Date: 2018/11/17\nTrip End Date: 2018/11/20\nBooking Status: confirmed');
//           //  var images = [result[0].img1, result[0].img2, result[0].img3, result[0].img4, result[0].img5]
//           //   // res.body = result + images
//           // console.log("hello");
//           res.end(JSON.stringify(result));
//         }
//       });
//     }
//     con.release();
//   });
// });

// app.get('/profile', verifyToken, (req,res)=>{
//   jwt.verify(req.token, 'secretkey', (err, data) =>{
//     if(err){
//       res.sendStatus(403)
//       // console.log('Data is:' + data);
//     }else{
//       Traveler.findOne({}).then((traveler)=>{
//       console.log(traveler)
//         res.code = "200";
//         res.send({traveler});
//     },(err) => {
//         res.code = "400";
//         res.send("Bad Request");
//     })
//     console.log('Data is:', data);
//     }
//   }

//    )

// })

//Token Format
// Authorization: Bearer <Access_token>

//verify Token sent by client
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //Check if Bearer header is undefined
  if (typeof bearerHeader !== "undefined") {
    //Split the token at space
    const bearer = bearerHeader.split(" ");
    //Get token value
    const bearerToken = bearer[1];
    //Set token to request's token
    req.token = bearerToken;
    //Next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

//Route to handle new profile updation details
// app.post("/profile/:userid", function(req, res) {
//   console.log("Inside profile update request");
//   console.log(req.body.user);
//   var firstname = req.body.user[0].firstname;
//   var lastname = req.body.user[0].lastname;
//   var email = req.body.user[0].email;
//   var phone = req.body.user[0].phone;
//   var aboutme = req.body.user[0].aboutme;
//   var city = req.body.user[0].city;
//   var country = req.body.user[0].country;
//   var company = req.body.user[0].company;
//   var school = req.body.user[0].school;
//   var hometown = req.body.user[0].hometown;
//   var languages = req.body.user[0].languages;
//   var gender = req.body.user[0].gender;
//   // var password = crypt.cryptPassword(req.body.password);
//   var sql =
//     "UPDATE traveler set firstname = " +
//     mysql.escape(firstname) +
//     ", lastname = " +
//     mysql.escape(lastname) +
//     ", email = " +
//     mysql.escape(email) +
//     ", phone = " +
//     mysql.escape(phone) +
//     ", aboutme = " +
//     mysql.escape(aboutme) +
//     ", city = " +
//     mysql.escape(city) +
//     ", country = " +
//     mysql.escape(country) +
//     ", company = " +
//     mysql.escape(company) +
//     ", school = " +
//     mysql.escape(school) +
//     ", gender = " +
//     mysql.escape(gender) +
//     ", hometown = " +
//     mysql.escape(hometown) +
//     ", languages = " +
//     mysql.escape(languages) +
//     " where id = " +
//     req.params.userid +
//     ";";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           console.log(err);
//           res.end("Could not update profile");
//         } else {
//           console.log(result);
//           // res.cookie("owner", "user1", {
//           //   maxAge: 90000000,
//           //   httpOnly: false,
//           //   path: "/"
//           // });
//           // req.session.user = result;
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log(`Successfully updated profile`);
//           res.end("Successfully updated profile");
//         }
//       });
//     }
//     con.release();
//   });
// });

//Route to get All trips of traveler
// app.get(`/trips/:userid`, function(req, res) {
//   var sql =
//     "SELECT *, date_format(startdate, '%d %M %Y') as startdate, date_format(enddate, '%d %M %Y') as enddate FROM trips where travelerid = " +
//     req.params.userid +
//     ";";
//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Invalid query");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "application/json"
//           });
//           res.end(JSON.stringify(result));
//           console.log(result);
//           con.release();
//         }
//       });
//     }
//   });
// });

//Route to get traveler's profile
app.get(`/profile/:travelerid`, function(req, res) {
  kafka.make_request("profile", req.params, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      // res.status(401)
      res.end(JSON.stringify(results));
      // res.json({status: 401})
    }
  });
});

//Route to get to owner dashboard
app.get(`/owner-dashboard/:ownerid`, function(req, res) {
  kafka.make_request("owner-dashboard", req.params, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      // res.status(401)
      res.end(JSON.stringify(results));
      // res.json({status: 401})
    }
  });
});

app.get(`/trips/:userid`, function(req, res) {
  kafka.make_request("trips", req.params, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      // res.status(401)
      res.end(JSON.stringify(results));
      // res.json({status: 401})
    }
  });
});

// app.get("/owner-dashboard/:ownerid", function(req, res) {
//   console.log("Inside Owner dashboard Request");
//   var sql =
//     "SELECT name, property.city,  property.state, property.country,  listdate, date_format(booking_start_date, '%d %M %Y') as booking_start_date, date_format(booking_end_date, '%d %M %Y') as booking_end_date, firstname, lastname FROM property inner join property_history on property.id = property_history.propertyid inner join traveler on property_history.travelerid = traveler.id where property.ownerid = " +
//     req.params.ownerid;

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Could Not Get Connection Object");
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "application/json"
//           });
//           console.log(result);
//           // console.log("hello");
//           res.end(JSON.stringify(result));
//         }
//       });
//     }
//     con.release();
//   });
// });

//Route to handle New user request
// app.post("/signup-traveler", function(req, res) {
//   console.log("Inside New user creation Request");
//   var firstname = req.body.firstname;
//   var lastname = req.body.lastname;
//   var email = req.body.email;
//   var password = crypt.cryptPassword(req.body.password);
//   var sql =
//     "INSERT INTO traveler(firstname, lastname, email, password) VALUES(" +
//     mysql.escape(firstname) +
//     ", " +
//     mysql.escape(lastname) +
//     ", " +
//     mysql.escape(email) +
//     ", " +
//     mysql.escape(password) +
//     ");";
//   //     SELECT firstname  FROM traveler WHERE email = " +
//   //   mysql.escape(email) +
//   //   "and password = " +
//   //   mysql.escape(password);

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           res.end("Could not create new user");
//         } else {
//           res.cookie("cookie", "user1", {
//             maxAge: 90000000,
//             httpOnly: false,
//             path: "/"
//           });
//           req.session.user = result;
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log(`Successfully created new user with login: ${email}`);
//           res.end("Successfully created new user");
//         }
//       });
//     }
//     con.release();
//   });
// });

app.post("/profile", function(req, res, next) {
  kafka.make_request("profile-update", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      // res.json({
      //     // err, status: 401
      // })
      res.status(401);
    } else {
      var a = [results];
      res.send(a);
      res.end();
      res.status(202);
    }
  });
});

// app.post('/signup-owner', function(req, res){
//     kafka.make_request('signup-owner', req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                 err
//             })
//         }else{
//                 res.json(results)
//                 res.end();
//             }

//     });
// });

//Route to handle new property location details
app.post("/location", function(req, res) {
  kafka.make_request("location", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

// app.post("/location", function(req, res) {
//   console.log("Inside submitting property details request");
//   var country = req.body.country;
//   var streetaddress = req.body.streetAddress;
//   var unit = req.body.unit;
//   var city = req.body.city;
//   var state = req.body.state;
//   var zipcode = req.body.zipcode;
//   // var password = crypt.cryptPassword(req.body.password);
//   var sql =
//     "INSERT INTO property(country, streetaddress, unit, city, state, zipcode) VALUES(" +
//     mysql.escape(country) +
//     ", " +
//     mysql.escape(streetaddress) +
//     ", " +
//     mysql.escape(unit) +
//     ", " +
//     mysql.escape(city) +
//     ", " +
//     mysql.escape(state) +
//     ", " +
//     mysql.escape(zipcode) +
//     ");";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           console.log(err);
//           res.end("Could not save location details of property");
//         } else {
//           // res.cookie("owner", "user1", {
//           //   maxAge: 90000000,
//           //   httpOnly: false,
//           //   path: "/"
//           // });
//           // req.session.user = result;
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log(`Successfully created new property location details`);
//           res.end("Successfully created new property location");
//         }
//       });
//     }
//     con.release();
//   });
// });

//Route to handle new property location details
app.post("/details", function(req, res) {
  kafka.make_request("details", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

//Route to handle new property location details
app.post("/amenities", function(req, res) {
  kafka.make_request("amenities", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

app.post("/details", function(req, res) {
  kafka.make_request("details", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

// app.post("/details", function(req, res) {
//   console.log("Inside submitting property details request");
//   var headline = req.body.headline;
//   var propertyDescription = req.body.propertyDescription;
//   var propertyType = req.body.propertyType;
//   var bedrooms = req.body.bedrooms;
//   var accomodates = req.body.accomodates;
//   var bathrooms = req.body.bathrooms;
//   // var password = crypt.cryptPassword(req.body.password);
//   var sql =
//     "UPDATE property set headline = " +
//     mysql.escape(headline) +
//     ", propertyDescription = " +
//     mysql.escape(propertyDescription) +
//     ", propertyType = " +
//     mysql.escape(propertyType) +
//     ", bedrooms = " +
//     mysql.escape(bedrooms) +
//     ", accomodates = " +
//     mysql.escape(accomodates) +
//     ", bathrooms = " +
//     mysql.escape(bathrooms) +
//     " where id = 4;";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           console.log(err);
//           res.end("Could not save location details of property");
//         } else {
//           // res.cookie("owner", "user1", {
//           //   maxAge: 90000000,
//           //   httpOnly: false,
//           //   path: "/"
//           // });
//           // req.session.user = result;
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log(`Successfully stored dates of property`);
//           res.end("Successfully stored dates of property");
//         }
//       });
//     }
//     con.release();
//   });
// });

app.post("/pricing", function(req, res) {
  kafka.make_request("pricing", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

app.post("/images", function(req, res) {
  kafka.make_request("images", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

app.post("/traveler-message", function(req, res) {
  kafka.make_request("traveler-message", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

app.post("/owner-message", function(req, res) {
  kafka.make_request("owner-message", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

app.post("/book-property", function(req, res) {
  kafka.make_request("book-property", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        err
      });
    } else {
      res.json(results);
      res.end();
    }
  });
});

// app.post("/pricing", function(req, res) {
//   console.log("Inside submitting dates request");
//   var minStay = req.body.minStay;
//   var currency = req.body.curency;
//   var startDate = req.body.startDate;
//   var endDate = req.body.endDate;
//   // var accomodates = req.body.accomodates;
//   // var bathrooms = req.body.bathrooms;
//   // var password = crypt.cryptPassword(req.body.password);
//   var sql =
//     "UPDATE property set minStay = " +
//     mysql.escape(minStay) +
//     ", currency = " +
//     mysql.escape(currency) +
//     ", startDate = " +
//     mysql.escape(startDate) +
//     ", endDate = " +
//     mysql.escape(endDate) +
//     " where id = 4;";

//   pool.getConnection(function(err, con) {
//     if (err) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Could Not Get Connection Object");
//     } else {
//       con.query(sql, function(err, result) {
//         if (err) {
//           res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           console.log(err);
//           res.end("Could not save dates of property");
//         } else {
//           // res.cookie("owner", "user1", {
//           //   maxAge: 90000000,
//           //   httpOnly: false,
//           //   path: "/"
//           // });
//           // req.session.user = result;
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           console.log(`Successfully stored dates of property`);
//           res.end("Successfully stored dates of property");
//         }
//       });
//     }
//     con.release();
//   });
// });

// start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

//Implementing file upload

app.post("/upload", multer(multerConfig).array("photo", 5), function(req, res) {
  // Value of sql would be generated based upon the count variable below
  console.log("**********");
  // console.log(req);
  console.log("**********");
  // get the count of the files and update your query accordingly
  var count = req.files.length;

  console.log("Uploading files using post function");
  // console.log(req);
  console.log(req.files);
  var files = [];
  req.files.forEach(file => {
      files.push(file.path.slice(file.path.indexOf("/Images")));
    // files.push(file.path);
  });
  console.log(files);

  if (req.files.length == 0) {
    console.log("Files not found by multer");
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Files object not found");
  } else {
    //   let a = files.length
    Owner.update(
      { _id: req.body.ownerid },
      { $set: { "propertydetails.0.propertyimages": files } },
      { upsert: true },
      function(err, data) {
        if (err) {
          console.log("Could not add images");
          res.send(err);
        } else {
          console.log("Images successfully stored");
          res.send({ data, value: 100 });
          //   res.status(203)
        }
      }
    );
  }
});

app.post("/uploadpic", multer(multerConfig).array("photo", 5), function(
  req,
  res
) {
  // Value of sql would be generated based upon the count variable below
  console.log("**********");
  // console.log(req);
  console.log("**********");
  // get the count of the files and update your query accordingly
  var count = req.files.length;

  console.log("Uploading files using post function");
  // console.log(req);
  console.log(req.files);
  var files = [];
  req.files.forEach(file => {
    files.push(file.path.slice(file.path.indexOf("/Images")));
  });
  console.log(files);

  if (req.files.length == 0) {
    console.log("Files not found by multer");
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Files object not found");
  } else {
    //   let a = files.length
    Traveler.update(
      { _id: req.body.travelerid },
      { $set: { imagelocation: files } },
      { upsert: true },
      function(err, data) {
        if (err) {
          console.log("Could not add profile picture");
          res.send(err);
        } else {
          console.log("Profile picture successfully stored");
          res.send({ data, value: 100 });
          //   res.status(203)
        }
      }
    );
  }
});
