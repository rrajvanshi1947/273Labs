//import the require dependencies
var express = require("express");
const multer = require("multer");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
// const bcrypt = require('bcrypt');

//import local files
var mysql = require("mysql");
var pool = require("./pool");
var crypt = require("./crypto");

var mongo = require("mongodb");
var { Traveler } = require("./models/traveler");
var { mongoose } = require("./db/mongoose");

var app = express();
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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

const multerConfig = {
  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({
    //specify destination
    destination: function(req, file, next) {
      next(null, "../Frontend/public/Images/Property");
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
  express.static(path.join(__dirname, "../Frontend/public/Images/Property"))
);

app.post("/traveler-login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(`User provided password: ${password}`);
  var sql = "SELECT * FROM traveler WHERE email = " + mysql.escape(email);
  "and password = " +
  mysql.escape(password);

  pool.getConnection(function(err, con) {
    if (err) {
      res.value = "Unable to connect to database";
      console.log(res.value);
      res.sendStatus(400).end();
    } else if (data == null) {
      res.body =
        "The email and password you entered did not match our records. Please double-check and try again.";
      console.log(
        "Unable to find user details using " + email + " and " + password
      );
      res.status(401).send(
        'The email and password you entered did not match our records. Please double-check and try again.')
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Credentials");
        } else {
          console.log(result);
          if (
            result.length === 1 &&
            result[0].password === password &&
            crypt.comparePassword(password, result[0].password)
          ) {
            res.cookie("user", result[0].id, {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            res.cookie("usertype", "traveler", {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            req.session.user = result;
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            console.log(`Successful login: ${email}`);
            res.end("Successful Login");
          } else {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            console.log("Invalid credentials");
            res.end("Invalid credentials");
          }
        }
      });
      console.log(res.value);
      console.log("Login successful");
      res.sendStatus(200).end();
    }
  });
});

//Route to handle Post Request Call
// app.post("/traveler-login", function(req, res) {
//   console.log("Inside Login Post Request");
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log(`User provided email: ${email}`);
//   // console.log(`User provided password: ${password}`);
//   var sql = "SELECT * FROM traveler WHERE email = " + mysql.escape(email);
//   "and password = " +
//   mysql.escape(password);

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
//           res.end("Invalid Credentials provided");
//         } else {
//           console.log(result);
//           if (
//             result.length === 1  &&
//             crypt.comparePassword(password, result[0].password)
//           ) {
//             res.cookie("user", result[0].id, {
//               maxAge: 900000,
//               httpOnly: false,
//               path: "/"
//             });
//             res.cookie("usertype", "traveler", {
//               maxAge: 900000,
//               httpOnly: false,
//               path: "/"
//             });
//             req.session.user = result;
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             console.log(`Successful login: ${email}`);
//             res.end("Successful Login");
//           } else {
//             res.writeHead(400, {
//               "Content-Type": "text/plain"
//             });
//             console.log("Invalid credentials");
//             res.end("Invalid credentials");
//           }
//         }
//       });
//     }
//     con.release();
//   });
// });

//Route to handle search request
app.post("/search", function(req, res) {
  console.log("Inside Property search request");
  var city = req.body.city;
  var startDate = req.body.arriveDate;
  var endDate = req.body.departDate;
  // console.log(`User provided password: ${password}`);
  var sql =
    "SELECT * FROM property inner join propertyimages on property.id = propertyimages.propertyid WHERE city = " +
    mysql.escape(city) +
    "AND startDate <= " +
    mysql.escape(startDate) +
    "AND endDate >= " +
    mysql.escape(endDate) +
    ";";
  // + mysql.escape(city)  + ";"
  // "and password = " +
  // mysql.escape(password);
  // + ", date_format(startDate, '%Y %M %D') as startDate < " + mysql.escape(startDate) + ";"

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid search");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          console.log(result);

          //  var images = [result[0].img1, result[0].img2, result[0].img3, result[0].img4, result[0].img5]
          //   // res.body = result + images
          // console.log("hello");
          res.end(JSON.stringify(result));
        }
      });
    }
    con.release();
  });
});

//Route to handle Post Login Request Call for owner
app.post("/owner-login", function(req, res) {
  console.log("Inside Login Post Request for owner");
  var email = req.body.email;
  var password = req.body.password;
  console.log(`User provided password: ${email}`);
  var sql = "SELECT * FROM owner WHERE email = " + mysql.escape(email);
  // "and password = " +
  // mysql.escape(password);

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Credentials");
        } else {
          console.log(result);
          if (
            result.length === 1 &&
            crypt.comparePassword(password, result[0].password)
          ) {
            res.cookie("user", result[0].id, {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            res.cookie("usertype", "owner", {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            req.session.user = result;
            res.writeHead(202, {
              "Content-Type": "text/plain"
            });
            console.log(`Successful login: ${email}`);
            res.end("Successful Login");
          } else {
            console.log("Invalid credentials");
            res.sendStatus(404);
            res.end("Invalid credentials");
          }
        }
      });
    }
    con.release();
  });
});

//firstname, lastname, email, phone, aboutme, city, country, company, school, hometown, languages
//Route to get All Books when user visits the Home Page

// aboutme
// :
// "I love travelling because it opens my mind."
// city
// :
// "Los Angeles"
// company
// :
// "Google"
// country
// :
// "United States"
// email
// :
// "a"
// firstname
// :
// "Megan"
// gender
// :
// "Female"
// hometown
// :
// "San Jose"
// id
// :
// 1
// languages
// :
// "Eng"
// lastname
// :
// "Shaw"
// password
// :
// "$2a$04$NMQa0zw0f5SfLHR29Socsew61thas50EyPXpcyTlquUvRx.GahFKW"
// phone
// :
// 6692644589
// school

//Route to handle new property location details
app.post("/profile/:userid", function(req, res) {
  console.log("Inside profile update request");
  console.log(req.body.user);
  var firstname = req.body.user[0].firstname;
  var lastname = req.body.user[0].lastname;
  var email = req.body.user[0].email;
  var phone = req.body.user[0].phone;
  var aboutme = req.body.user[0].aboutme;
  var city = req.body.user[0].city;
  var country = req.body.user[0].country;
  var company = req.body.user[0].company;
  var school = req.body.user[0].school;
  var hometown = req.body.user[0].hometown;
  var languages = req.body.user[0].languages;
  var gender = req.body.user[0].gender;
  // var password = crypt.cryptPassword(req.body.password);
  var sql =
    "UPDATE traveler set firstname = " +
    mysql.escape(firstname) +
    ", lastname = " +
    mysql.escape(lastname) +
    ", email = " +
    mysql.escape(email) +
    ", phone = " +
    mysql.escape(phone) +
    ", aboutme = " +
    mysql.escape(aboutme) +
    ", city = " +
    mysql.escape(city) +
    ", country = " +
    mysql.escape(country) +
    ", company = " +
    mysql.escape(company) +
    ", school = " +
    mysql.escape(school) +
    ", gender = " +
    mysql.escape(gender) +
    ", hometown = " +
    mysql.escape(hometown) +
    ", languages = " +
    mysql.escape(languages) +
    " where id = " +
    req.params.userid +
    ";";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(err);
          res.end("Could not update profile");
        } else {
          console.log(result);
          // res.cookie("owner", "user1", {
          //   maxAge: 900000,
          //   httpOnly: false,
          //   path: "/"
          // });
          // req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully updated profile`);
          res.end("Successfully updated profile");
        }
      });
    }
    con.release();
  });
});

//Route to get All trips of traveler
app.get(`/trips/:userid`, function(req, res) {
  var sql =
    "SELECT *, date_format(startdate, '%d %M %Y') as startdate, date_format(enddate, '%d %M %Y') as enddate FROM trips where travelerid = " +
    req.params.userid +
    ";";
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid query");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify(result));
          console.log(result);
          con.release();
        }
      });
    }
  });
});

//Route to get All Books when user visits the Home Page
app.get("/owner-dashboard/:ownerid", function(req, res) {
  console.log("Inside Owner dashboard Request");
  var sql =
    "SELECT name, property.city,  property.state, property.country,  listdate, date_format(booking_start_date, '%d %M %Y') as booking_start_date, date_format(booking_end_date, '%d %M %Y') as booking_end_date, firstname, lastname FROM property inner join property_history on property.id = property_history.propertyid inner join traveler on property_history.travelerid = traveler.id where property.ownerid = " +
    req.params.ownerid;

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could Not Get Connection Object");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          console.log(result);
          // console.log("hello");
          res.end(JSON.stringify(result));
        }
      });
    }
    con.release();
  });
});

//Route to handle New user request
app.post("/signup-traveler", function(req, res) {
  console.log("Inside New user creation Request");
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = crypt.cryptPassword(req.body.password);
  var sql =
    "INSERT INTO traveler(firstname, lastname, email, password) VALUES(" +
    mysql.escape(firstname) +
    ", " +
    mysql.escape(lastname) +
    ", " +
    mysql.escape(email) +
    ", " +
    mysql.escape(password) +
    ");";
  //     SELECT firstname  FROM traveler WHERE email = " +
  //   mysql.escape(email) +
  //   "and password = " +
  //   mysql.escape(password);

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could not create new user");
        } else {
          res.cookie("cookie", "user1", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully created new user with login: ${email}`);
          res.end("Successfully created new user");
        }
      });
    }
    con.release();
  });
});

//Route to handle new property location details
app.post("/location", function(req, res) {
  console.log("Inside submitting property details request");
  var country = req.body.country;
  var streetaddress = req.body.streetAddress;
  var unit = req.body.unit;
  var city = req.body.city;
  var state = req.body.state;
  var zipcode = req.body.zipcode;
  // var password = crypt.cryptPassword(req.body.password);
  var sql =
    "INSERT INTO property(country, streetaddress, unit, city, state, zipcode) VALUES(" +
    mysql.escape(country) +
    ", " +
    mysql.escape(streetaddress) +
    ", " +
    mysql.escape(unit) +
    ", " +
    mysql.escape(city) +
    ", " +
    mysql.escape(state) +
    ", " +
    mysql.escape(zipcode) +
    ");";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(err);
          res.end("Could not save location details of property");
        } else {
          // res.cookie("owner", "user1", {
          //   maxAge: 900000,
          //   httpOnly: false,
          //   path: "/"
          // });
          // req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully created new property location details`);
          res.end("Successfully created new property location");
        }
      });
    }
    con.release();
  });
});

//Route to handle new property location details
app.post("/details", function(req, res) {
  console.log("Inside submitting property details request");
  var headline = req.body.headline;
  var propertyDescription = req.body.propertyDescription;
  var propertyType = req.body.propertyType;
  var bedrooms = req.body.bedrooms;
  var accomodates = req.body.accomodates;
  var bathrooms = req.body.bathrooms;
  // var password = crypt.cryptPassword(req.body.password);
  var sql =
    "UPDATE property set headline = " +
    mysql.escape(headline) +
    ", propertyDescription = " +
    mysql.escape(propertyDescription) +
    ", propertyType = " +
    mysql.escape(propertyType) +
    ", bedrooms = " +
    mysql.escape(bedrooms) +
    ", accomodates = " +
    mysql.escape(accomodates) +
    ", bathrooms = " +
    mysql.escape(bathrooms) +
    " where id = 4;";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(err);
          res.end("Could not save location details of property");
        } else {
          // res.cookie("owner", "user1", {
          //   maxAge: 900000,
          //   httpOnly: false,
          //   path: "/"
          // });
          // req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully stored dates of property`);
          res.end("Successfully stored dates of property");
        }
      });
    }
    con.release();
  });
});

app.post("/pricing", function(req, res) {
  console.log("Inside submitting dates request");
  var minStay = req.body.minStay;
  var currency = req.body.curency;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  // var accomodates = req.body.accomodates;
  // var bathrooms = req.body.bathrooms;
  // var password = crypt.cryptPassword(req.body.password);
  var sql =
    "UPDATE property set minStay = " +
    mysql.escape(minStay) +
    ", currency = " +
    mysql.escape(currency) +
    ", startDate = " +
    mysql.escape(startDate) +
    ", endDate = " +
    mysql.escape(endDate) +
    " where id = 4;";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          console.log(err);
          res.end("Could not save dates of property");
        } else {
          // res.cookie("owner", "user1", {
          //   maxAge: 900000,
          //   httpOnly: false,
          //   path: "/"
          // });
          // req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully stored dates of property`);
          res.end("Successfully stored dates of property");
        }
      });
    }
    con.release();
  });
});

// start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

//Implementing file upload

app.post("/upload", multer(multerConfig).array("photo", 5), function(req, res) {
  // Value of sql would be generated based upon the count variable below
  console.log("**********");
  console.log(req);
  console.log("**********");
  var sql = "update propertyimages ";
  // get the count of the files and update your query accordingly
  var count = req.files.length;
  switch (count) {
    case 1:
      sql =
        sql +
        " set img1 = '" +
        req.files[0].filename +
        "' where propertyid = 2;";
      break;
    case 2:
      sql =
        sql +
        "set img1 = '" +
        req.files[0].filename +
        "', img2 = '" +
        req.files[1].filename +
        "' where propertyid = 2;";
      break;
    case 3:
      sql =
        sql +
        "set img1 = '" +
        req.files[0].filename +
        "', img2 = '" +
        req.files[1].filename +
        "',img3 = '" +
        req.files[2].filename +
        "' where propertyid = 2;";
      break;
    case 4:
      sql =
        sql +
        " set img1 = '" +
        req.files[0].filename +
        "', img2 = '" +
        req.files[1].filename +
        "', img3 = '" +
        req.files[2].filename +
        "', img4 = '" +
        req.files[3].filename +
        "' where propertyid = 2;";
      break;
    case 5:
      sql =
        sql +
        "set img1 = '" +
        req.files[0].filename +
        "', img2 = '" +
        req.files[1].filename +
        "', img3 = '" +
        req.files[2].filename +
        "', img4 = '" +
        req.files[3].filename +
        "', img5 = '" +
        req.files[4].filename +
        "' where propertyid = 2;";
      break;
    default:
      console.log("Count value not generated");
      sql = "";
      break;
  }
  console.log("Uploading files using post function");
  // console.log(req);
  console.log(req.files);
  // sql =
  //   "insert into propertyimages (propertyid,img1) values(2,'" +
  //   req.files[0].filename +
  //   "')";
  if (sql.length == 0) {
    console.log("Files not found by multer");
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Files object not found");
  } else {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(sql, function(err, result) {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            console.log(err);
            res.end("Could not save images location in db");
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            console.log(`Successfully stored images of property`);
            res.end("Successfully stored images of property");
          }
        });
      }
      con.release();
    });
  }
  // res.send(
  //   'Complete! Check out your public/photo-storage folder.  Please note that files not encoded with an image mimetype are rejected. <a href="index.html">try again</a>'
  // );
});
