const db = require('../helpers/db');
const Record = db.Record;

module.exports = {
    storeRecord
};

async function storeRecord(recordParams) {
    // create a new record
    const record = new Record(recordParams);
    // save record
    return record.save();
}