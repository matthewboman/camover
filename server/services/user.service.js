var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mongo = require('mongoskin');
var Q = require('q');

var config = require('../../config.js');
var db = mongo.db(config.database, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;

module.exports = service;

// Authenticate user upon login
function authenticate(username, password) {
    var deferred = Q.defer();

    // Find user in database
    db.users.findOne({ username: username}, function (err, user) {
      if (err) deferred.reject(err);

      // Check if user exists and email has been verified
      if (user && user.verified == true) {
        verifyPassword(user);
      } else {
      deferred.reject('Email has not been verified');
        // deferred.resolve();
      }
    });

    // Compare typed password to database hash
    function verifyPassword(user) {
      if (user && bcrypt.compareSync(password, user.hash)) {
        // authentication successful
        deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
      } else {
        // authentication failed
        deferred.reject('Incorrect password');
      }
    }

    return deferred.promise;
}
