var Camera = require('../models/camera.model');
var mongoose = require('mongoose');
var Q = require('q');

// Get cameras from database
module.exports.getCameras = function(req, res) {
  var query = Camera.find({});
  query.exec(function(err, cameras){
    if(err) {
      res.send(err);
    }

    res.json(cameras);
  });
}

// Add camera to database
module.exports.addCamera = function(req, res) {

  var newCamera = new Camera(req.body);

  newCamera.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json(req.body);
  });
}

// Update camera with vote and add user to list
module.exports.voteCamera = function(req, res) {
  var deferred = Q.defer();
  var camera = {'_id': req.body._id};
  var newRating = req.body.rating;

  Camera.findOneAndUpdate({'_id': req.body._id}, {rating:req.body.rating}, function(err, camera) {
    if (err) deferred.reject(err);
  })

  Camera.findOneAndUpdate({'_id': req.body._id}, {voted:req.body.voted}, function(err, camera) {
    if (err) {
      res.send(err);
    }
    res.json(camera);
  })
}
