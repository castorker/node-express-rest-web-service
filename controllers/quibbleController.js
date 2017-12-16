var quibbleController = function (Quibble) {

  var post = function (req, res) {
    var quibble = new Quibble(req.body);

    if (!req.body.text) {
      res.status(400);
      res.send('Text is required.');
    }
    else {
      quibble.save();
      res.status(201);
      res.send(quibble);
    }
  }

  var getAll = function (req, res) {
    var query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    Quibble.find(query, function (err, quibbles) {
      if (err) {
        // console.log(err);
        res.status(500).send(err);
      } else {
        // HATEOAS - Using Hypermedia for easy API navigation
        var returnQuibbles = [];
        quibbles.forEach(function (element, index, array) {
            var newQuibble = element.toJSON();
            newQuibble.links = {};
            newQuibble.links.self = 'http://' + req.headers.host + '/api/quibbles/' + newQuibble._id;
            returnQuibbles.push(newQuibble);
        });
        res.json(returnQuibbles);
        // res.json(quibbles);
      }
    });
  }

  var getById = function (req, res) {
    // HATEOAS - Using Hypermedia for easy API navigation
    var returnQuibble = req.quibble.toJSON();
    returnQuibble.links = {};
    var newLink = 'http://' + req.headers.host + '/api/quibbles?category=' + returnQuibble.category;
    returnQuibble.links.FilterByThisCategory = newLink.replace(' ', '%20');
    res.json(returnQuibble);
  }

  var put = function(req, res) {
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
  }

  var patch = function(req, res) {
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
  }

  var del = function (req, res) {
    req.quibble.remove(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Quibble removed.');
      }
    });
  }

  return {
    post: post,
    getAll: getAll,
    getById: getById,
    put: put,
    patch: patch,
    del: del
  }
}

module.exports = quibbleController;
