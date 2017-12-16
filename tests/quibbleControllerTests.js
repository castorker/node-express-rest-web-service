var should = require('should'),
  sinon = require('sinon');

describe('Quibble Controller Tests:', function () {

  // Post testing suite
  describe('Post', function () {
    it('should not allow an empty text on post', function () {
      var Quibble = function (quibble) { this.save = function () { } };

      var req = {
        body: {
          category: 'General'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var quibbleController = require('../controllers/quibbleController.js')(Quibble);
      quibbleController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Request ' + res.status.args[0][0]);
      res.send.calledWith('Text is required.').should.equal(true);
    });

    // Run another Test
		it('should do something', function()
		{
		  // Another Condition
    });

  });

  // Run another Suite of Tests

  // Get testing suite
	describe('Get', function()
	{
		// Run another Test
		it('should do something', function()
		{
			// Another Condition
		});
  });

});
