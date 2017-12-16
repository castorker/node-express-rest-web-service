var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var Quibble = require('./models/quibbleModel');
var quibbles = require('./initDatabase.js');

var uri = "mongodb://localhost/quibbledb";

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

var app = express();

var port = process.env.PORT || 3000;

//handler for our route

var quibbleRouter = express.Router();

quibbleRouter.route('/Quibbles')
  .get(function (req, res) {

    var query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }
    Quibble.find(query, function(err, quibbles) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(quibbles);
      }
    });
  });

quibbleRouter.route('/Quibbles/:quibbleId')
  .get(function (req, res) {

    Quibble.findById(req.params.quibbleId, function(err, quibble) {
      if (err) {
          res.status(500).send(err);
        } else {
          res.json(quibble);
        }
      });
    });

app.use('/api', quibbleRouter);

app.get('/', function(req, res) {
   res.send('API served by Node and Express.');
});

app.listen(port, function() {
    console.log('Up & Running on PORT: ' + port);
});
