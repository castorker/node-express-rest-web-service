var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

//handler for our route
app.get('/', function(req, res) {
   res.send('API served by Node and Express.'); 
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});
