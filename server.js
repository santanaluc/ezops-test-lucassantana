var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

var dbUrl = 'mongodb+srv://client:Cp7ghBGKCumqP631@simple-chat.zxoln.mongodb.net/simple-chat?retryWrites=true&w=majority'
    
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

io.on('connection', () => {
    console.log('An user is connected')
})

mongoose.connect(dbUrl);

var server = http.listen(8080, () => {
    console.log('Server is running on port', server.address().port);
});
