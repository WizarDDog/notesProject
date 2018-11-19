const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var express = require('express')
var app = express()
var db = null;
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/newNote', function (req, res) {
    db.collection("Note").insertOne(req.body).then((res, err) => {
        console.log(err);
    })
    res.send('{"success: success"}')
})

app.get('/getNote/:username', function (req, res) {
    let userName = req.params.username
    db.collection("Note").find({username: userName}).toArray((err, docs) => {
        console.log(err);
        res.send(docs)
    })
})
app.get('/getNote/:username/:allnotes', function (req, res) {
    let userName = req.params.username;
    let allNotes = req.params.allnotes;
    db.collection("Note").deleteMany({username: userName, allnotes: allNotes}).then((err, res) => {
        console.log(err);
    })
})

app.get('/getNote/:notesname/:allnotes/:time', function (req, res) {
    let notesName = req.params.notesname;
    let allNotes = req.params.allnotes;
    let timeNote = req.params.time;
    db.collection("Note").updateOne({timeStamp: timeNote}, {$set:{allnotes: allNotes, writtenNotesName: notesName}}).then((err, res) => {
        console.log(err);
    })
})

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    app.listen(2000)
    //client.close();
});