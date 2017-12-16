var should = require('should'),
  request = require('supertest'),
  app = require('../app.js'),
  mongoose = require('mongoose'),
  Quibble = mongoose.model('Quibble'),
  agent = request.agent(app);

describe('Quibble Crud Test', function () {
  it('Should allow a quibble to be posted and return a like and _id', function (done) {
    var quibblePost = { text: 'new Quibble', category: 'Programming' };

    agent.post('/api/quibbles')
      .send(quibblePost)
      .expect(200)
      .end(function (err, results) {
        results.body.like.should.equal(false);  // this will pass
        // results.body.like.should.not.equal(false);  // this will fail
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(function (done) {
    Quibble.remove().exec();
    done();
  });

});
