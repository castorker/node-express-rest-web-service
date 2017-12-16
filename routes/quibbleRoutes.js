var express = require('express');

var routes = function(Quibble) {
  var quibbleRouter = express.Router();
  var quibbleController = require('../controllers/quibbleController')(Quibble);

  quibbleRouter.route('/')
    .post(quibbleController.post)
    .get(quibbleController.getAll);

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
    .get(quibbleController.getById)
    .put(quibbleController.put)
    .patch(quibbleController.patch)
    .delete(quibbleController.del);

    return quibbleRouter;
};

module.exports = routes;
