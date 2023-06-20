// Importing the mongoose library
const mongoose = require("mongoose");

// Connecting to the database
mongoose.connect(process.env.MONOGDB_URI || "mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Exporting the connection to the database as a module
module.exports = mongoose.connection;