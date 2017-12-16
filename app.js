var express = require('express'),
  bodyParser = require('body-parser'),
  Quibble = require('./models/quibbleModel');

require('./server/database.js');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// handler for our routes
quibbleRouter = require('./routes/quibbleRoutes')(Quibble);

app.use('/api/quibbles', quibbleRouter);

app.get('/', function(req, res) {
   res.send('API served by Node and Express.');
});

app.listen(port, function() {
    console.log('Up & Running on PORT: ' + port);
});
