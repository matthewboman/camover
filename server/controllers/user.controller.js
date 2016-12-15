var tempUserService = require('../services/tempuser.service');
var userService = require('../services/user.service');

// Create new user
module.exports.createUser = function(req, res) {
  tempUserService.create(req.body)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

// Verify new user's email address
module.exports.verifyUser = function(req, res) {
  var username = req.params.username;
  tempUserService.verify(username)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

// Log user in
module.exports.loginUser = function(req, res) {
  userService.authenticate(req.body.username, req.body.password)
    .then(function (token) {
        res.send({
          // success: true,
          status: 200,
          token: token });
    })
    .catch(function (err) {
      res.send({
        success: false,
        message: err
      })
    });
}
