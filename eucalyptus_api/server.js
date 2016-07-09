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
            if (parseInt(req.params.id) > 0) {
                search_obj = {_id: ObjectId(req.params.id)};
            } else {
                search_obj = {slug: req.params.id};
            }
        } else if (req.params.collection === "elements") {
            search_obj = {page_id: req.params.id};
        } else {
            search_obj = {_id: ObjectId(req.params.id)};
        }

        collection.find(search_obj).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

app.post('/:database/:collection', function(req, res) {
    var data = req.body;
    console.log("data posted:", data);
    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection(req.params.collection);
        console.log(req.params.database,req.params.collection);
        if (req.params.collection === "elements") {
            console.log('here', data.length);
            for (var element of data) {
                if (element._id) {
                    element._id = ObjectId(element._id);
                }
                console.log('element', element);
                // collection.update({_id: element._id}, element, {upsert: true});
                collection.insert(element);
            }
        } else {
            collection.update({_id: ObjectId(data._id)}, data, {upsert: true});
        }

        console.log("   ");

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
