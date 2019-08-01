const recordService = require('./records/record.service');
const winston = require('./helpers/winston');
var app = require('express')();
var https = require('https');

var server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/cbd.usask.ca/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cbd.usask.ca/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/cbd.usask.ca/chain.pem'),
    requestCert: false,
    rejectUnauthorized: false
}, app);


server.listen(8080);

// will create a socket server
var io = require('socket.io').listen(server);

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