module.exports = {
  "database": "mongodb://root:kcsw@ds019846.mlab.com:19846/camover", // temporary for testing
  "port": process.env.PORT || 3000,
  "secret": "secret", // temporary
  "transport": "smtps://", // node-mailer transport object
  "baseURL": "http://localhost:3000"
}
