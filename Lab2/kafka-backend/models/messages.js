var mongoose = require("mongoose");

var Messages = new mongoose.Schema({
    subject: String,
    messages: [Object]
});

module.exports = mongoose.model("messages", Messages);