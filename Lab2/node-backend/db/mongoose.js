var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("debug", true);
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 100, // Maintain up to 100 socket connections
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
mongoose
  .connect(
    "mongodb://root:rrrrr1@ds147011.mlab.com:47011/homeapp",
    options)
  .then(() => {
    console.log("Connection to DB establsihed");
  })
  .catch(err => {
    console.log("Connection unsuccessful");
  });
module.exports = { mongoose };
