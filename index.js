const recordService = require('./records/record.service');
const winston = require('./helpers/winston');
const shortid = require('shortid');

// will create a socket server on port 8080
var io = require('socket.io')(8080);

const recordStoreReference = {
    userID: '',
    timestamp: '',
    source: '',
    startTime: '',
    endTime: '',
    data: '',
};

//  This is a temporary store , so when someone connects 
// we store their data here 
var users = {};


// When a user is connected 
io.on('connection', function(socket) {
    // not an elegant soultion but
    // access to userID is scoped out for every connection 
    // so would work even for multiple users
    var userID = socket.id;
    // create a key for user
    users[userID] = [];
    // log
    winston.info(userID + 'is connected now');
    // when a user send a message 
    socket.on('jbrowse', function(msg) {
        users[userID].push(msg.payload);
    });
    //  when a user disconnects from the socket 
    socket.on('disconnect', function() {
        winston.info(userID + 'is disconnected now');
        recordService.storeRecord({ userID, 'data': users[userID] })
            .then(() => {
                delete users[userID];
                winston.info('data stored for ' + userID);
            });
    });
});