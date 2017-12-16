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

  // middleware
  quibbleRouter.use('/:quibbleId', function (req, res, next) {
    Quibble.findById(req.params.quibbleId, function (err, quibble) {
      if (err) {
        res.status(500).send(err);
      } else if (quibble) {
        req.quibble = quibble;
        next();
      }
      else {
        res.status(404).send('No quibble found.');
      }
    });
  });

  quibbleRouter.route('/:quibbleId')

    .get(function (req, res) {
      res.json(req.quibble);
    })

    .put(function(req, res) {
      // req.quibble.id = req.body.id;
      req.quibble.text = req.body.text;
      req.quibble.category = req.body.category;
      req.quibble.like = req.body.like;
      req.quibble.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.quibble);
        }
      });
    })

    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }

      for (var p in req.body) {
        req.quibble[p] = req.body[p];
      }

      req.quibble.save(function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.quibble);
        }
      });
    })

    .delete(function (req, res) {
      req.quibble.remove(function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Quibble removed.');
        }
    });
  });

  return quibbleRouter;
};

module.exports = routes;
