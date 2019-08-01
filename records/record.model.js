const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userID: { type: String, required: true },
    timestamp: { type: String, required: true },
    source: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: false },
    data: { type: Object, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Record', schema);