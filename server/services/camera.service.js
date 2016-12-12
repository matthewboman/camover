var mongo = require('mongoskin');
var Q = require('q');
var config = require('../../config.js');

// Set up database
var db = mongo.db(config.database, { native_parser: true });
db.bind('cameras');

// Create and export camera service
var service = {};

service.create = create;
service.get = get;
service.vote = vote;

module.exports = service;

// Add camera to database
function create(camera) {
  var deferred = Q.defer();

  addCamera(camera);

  function addCamera(camera) {
    var camera = {
      username: camera.username,
      position: camera.position,
      rating: camera.rating,
      info: camera.info,
      voted: camera.voted
    };

    db.cameras.insert(camera, function (err, doc) {
      if (err) deferred.reject(err);
      deferred.resolve();
    });
  }
  return deferred.promise;
}

// Get cameras from database
function get() {
  var deferred = Q.defer();

  db.cameras.find().toArray(function(err, cameras) {
    if (err) throw err;
    deferred.resolve(cameras);
  });

  return deferred.promise;
}

// Update camera vote
function vote(camera) {
  var deferred = Q.defer();

  updateCamera(camera);

  function updateCamera(camera) {

    var set = {voted: camera.voted, rating: camera.rating};
    db.cameras.update(
      {_id: mongo.helper.toObjectID(camera._id)},
      { $set: set},
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve();
      }
    );
  }
  return deferred.promise;
}
