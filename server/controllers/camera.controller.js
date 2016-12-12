var Q = require('q');
var cameraService = require('../services/camera.service');

module.exports.getCameras = function(req, res) {
  cameraService.get()
    .then(function (cameras) {
      res.json(cameras);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

// Add Camera to list on database
module.exports.addCamera = function(req, res) {
  cameraService.create(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

// Update camera with vote and add user to list
module.exports.voteCamera = function(req, res) {
  cameraService.vote(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}
