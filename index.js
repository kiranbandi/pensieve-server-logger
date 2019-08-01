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

    debugger;


    // when a user send a message 
    socket.on('chat message', function(msg) {

        // send message back to user 
        io.emit('chat message', msg);
    });

    //  when a user disconnects from the socket 
    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });



});