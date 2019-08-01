const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userID: { type: String, required: true },
    data: { type: Array, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Record', schema);