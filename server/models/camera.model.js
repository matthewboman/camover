var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CameraSchema = new Schema({
    username: {type: String, required: true},
    position: {type: [Number], required: true},
    rating: {type: Number, default: 0},
    info: {type: String},
    voted: {type: [String]}
});

module.exports = mongoose.model('camera', CameraSchema);
