var Quibble = require('../models/quibbleModel'),
  quibbles = require('./initDatabase'),
  mongoose = require('mongoose');

var uri;

if (process.env.ENV === 'Test') {
  uri = "mongodb://localhost/quibbledb_test";
}
else {
  uri = "mongodb://localhost/quibbledb";
}

// Set up default mongoose connection
mongoose.connect(uri, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.dropDatabase();

// Populate database with some initial quibbles
quibbles.forEach(function (quibble) {
  new Quibble(quibble).save();
});
