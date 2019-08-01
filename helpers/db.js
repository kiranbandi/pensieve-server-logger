const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pensieve');
mongoose.Promise = global.Promise;

module.exports = {
    Record: require('../records/record.model'),
};