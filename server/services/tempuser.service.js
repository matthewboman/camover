var bcrypt = require('bcryptjs');
var mongo = require('mongoskin');
var nodemailer = require('nodemailer');
var Q = require('q');
var config = require('../../config.js');

// Set up database
var db = mongo.db(config.database, { native_parser: true });
db.bind('users');
var transporter = nodemailer.createTransport(config.transport);

// Create and export tempUser service
var service = {};

service.create = create;
service.verify = verify;

module.exports = service;


// ======= Create user, store in database, send verification email ==========
function create(userParam) {
  var deferred = Q.defer();

  // Check if username is taken
  db.users.findOne({ username: userParam.username }, function (err, user) {
    if (err) deferred.reject(err);
    if (user) {
      deferred.reject('Username "' + userParam.username + '" is already taken');
    }
  });

  // Check if email is taken
  db.users.findOne({email: userParam.email }, function (err, user) {
    if (err) deferred.reject(err);
    if (user) {
      deferred.reject('Email "' + userParam.email + '" is already taken');
    } else {
      comparePasswords();
    }
  });

  // Compare password 1 and 2
  function comparePasswords() {
    if (userParam.password != userParam.password2) {
      deferred.reject('Passwords do not match');
    } else {
      createUser();
    }
  };

  // Create User
  function createUser() {
    // set user object to userParam without the cleartext password
    var user = {
      username: userParam.username,
      email: userParam.email,
      verified: false,
    }
    // Add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);
    // Insert user to database
    db.users.insert(user, function (err, doc) { //user
      if (err) deferred.reject(err);
      deferred.resolve();
    });
    sendEmail();
  }

  // Email user verification link
  function sendEmail() {
    // Create verification link based on username
    var link=config.baseURL + "/#/verify/" + userParam.username;
    // Setup e-mail data with unicode symbols
    var mailOptions = {
      from : "camover <camover1984@gmail.com>",
      to: userParam.email,
      subject: "Please confirm your email account",
      html: "Hello, <br> Please click on the link to verify your account. <br><a href="
            + link + ">Go to " + link + " to verify</a>"
    };
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    return link;
    console.log(link);
  }

  // Return errors
  return deferred.promise;
}

// ======= Change "false" boolean to "true" so user can login ==========
function verify(username) {
    var deferred = Q.defer();

    updateUser();

    function updateUser() {
      // fields to update
      var set = {verified: true};
      db.users.update(
        { username: mongo.helper.toObjectID(username) }, 
        { $set: set },
        function (err, doc) {
          if (err) deferred.reject(err.name + ': ' + err.message);
          deferred.resolve();
        });
    }
  // Return errors
  return deferred.promise;
}
