// ========================= Dependencies =================================
var bodyParser  = require('body-parser');
var express     = require('express');
var mongoose    = require('mongoose');

// My Dependencies
var config      = require('./config');
var cameraController = require('./server/controllers/camera.controller');
var userController = require('./server/controllers/user.controller');


// ========================= Set up app =================================
var app = express();
var PORT = config.port;

// Set the connection to MongoDB
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database');
  }
});


// ========================  Middleware ==============================
app.use(bodyParser.json());
app.use('/app', express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


// ========================= Routes ========================================
// camera
app.get('/cameras', cameraController.getCameras);
app.post('/cameras', cameraController.addCamera);
app.put('/cameras/:_id', cameraController.voteCamera);
// user
app.post('/users/register', userController.createUser);
app.put('/users/:username', userController.verifyUser);
app.post('/users/login', userController.loginUser);


// ========================== Endpoints ====================================
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

// ========================== Listener =======================================
app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
