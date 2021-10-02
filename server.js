var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

var dbUrl = 'mongodb+srv://client:Cp7ghBGKCumqP631@simple-chat.zxoln.mongodb.net/simple-?retryWrites=true&w=majority'
    
mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

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

app.delete('/messages/:messageId', (req, res) => {
    var obj = {_id: req.params.messageId};
    var message = new Message(obj);
    message.delete((err) => {
        if (err){
            res.sendStatus(500);
        } else {
            io.emit('deletion', obj._id);
            res.sendStatus(200);
        }
    })
});

//io = io.listen(server);

io.on('connection', () => {
    console.log('An user is connected')
})

mongoose.connect(dbUrl);

var server = http.listen(8080, () => {
    console.log('Server is running on port', server.address().port);
});