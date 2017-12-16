var express = require('express');

var routes = function(Quibble) {
  var quibbleRouter = express.Router();

  quibbleRouter.route('/')

    .post(function(req, res) {

      var quibble = new Quibble(req.body);
      // console.log(quibble);

      quibble.save();
      res.status(201).send(quibble);
    })

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

  quibbleRouter.route('/:quibbleId')

    .get(function (req, res) {

      Quibble.findById(req.params.quibbleId, function(err, quibble) {
        if (err) {
            res.status(500).send(err);
          } else {
            res.json(quibble);
          }
        });
      });

  return quibbleRouter;
};

module.exports = routes;
