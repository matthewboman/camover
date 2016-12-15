module.exports = {

  "database": "mongodb://root:kcsw@ds019846.mlab.com:19846/camover", // Mlab database or local Mongo
  "port": process.env.PORT || 3000,
  "secret": "secret", // temporary
  "transport": "smtps://camover1984%40gmail.com:camoverTEMP420@smtp.gmail.com", // node-mailer transport object
  "baseURL": "http://localhost:3000"

}
