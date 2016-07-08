var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());

app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/:database/:collection/:id', function(req, res) {
    console.log("database:", req.params.database);
    console.log("collection:", req.params.collection);
    console.log("id:", req.params.id);
    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection(req.params.collection);

        var search_obj = null;

        if (req.params.collection === "general") {
            search_obj = {};
        } else if (req.params.collection === "pages") {
            search_obj = {slug: req.params.id};
        } else if (req.params.collection === "elements") {
            search_obj = {page_id: req.params.id};
        } else {
            search_obj = {"_id": ObjectId(req.params.id)};
        }

        collection.find(search_obj).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
        // res.status(200).end();
    });
});

app.post('/savelog', function(req, res) {
    var data = req.body.data;
    var gameID = req.body.game;
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('game_logs');
        collection.update({game: gameID}, {game: gameID, data: data}, {upsert: true});
        db.close();
        res.status(200).end();
    });
});

// app.post('/loadlog', function(req, res) {
//     var gameID = req.body.game;
//     MongoClient.connect(url, function(err, db) {
//         var collection = db.collection('game_logs');
//         collection.find({game: gameID}).toArray(function(err, docs) {
//             res.json(docs);
//             db.close();
//         });
//     });
// });

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Eucalyptus by Koala");
});
