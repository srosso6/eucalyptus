var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:database/:collection', function(req, res) {
    console.log('one');
    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection(req.params.collection);
        collection.find({}).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

app.get('/:database/:collection/:id', function(req, res) {
    console.log("database:", req.params.database);
    console.log("collection:", req.params.collection);
    console.log("id:", req.params.id);
    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection(req.params.collection);
        if (req.params.collection === "pages") {
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


app.post('/:database/register', function (req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection('users');
        collection.insert(req.body, function(err, userdocs) {

            var collection2 = db.collection('general');
            collection2.insert({sitename: req.params.database, base_url: "localhost:3000", admin_id: userdocs.insertedIds[0], index: 'home'})
            var collection3 = db.collection('pages');
            collection3.insert({name: "Home Page", slug: 'home'}, function(err, docs) {
                console.log("error", err);
                console.log("doc", docs);
                res.json(userdocs)
                db.close();

            });


        });

        // res.status(200).end();
  });
});

app.post('/:database/:collection', function(req, res) {
    var data = req.body;

    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection(req.params.collection);
        if (req.params.collection === "elements") {
            var numComplete = 0;
            var checkIfCompleted = function(err, docs) {
                numComplete++;
                if (numComplete === data.length) {
                    db.close();
                }
            }

            for (var element of data) {
                if (element._id) {
                    element._id = ObjectId(element._id);
                    collection.update({_id: element._id}, element, {w:1}, checkIfCompleted);
                } else {
                    collection.insert(element, {w:1}, checkIfCompleted);
                }
                collection.update({_id: element._id}, element, {upsert: true});
            }
        } else if (req.params.collection === "users") {

          collection.find({email: data.email}).toArray(function(err, docs) {
              if (bcrypt.compareSync(data.password, docs[0].password)) {
                  res.json(docs[0]);
              } else {
                  res.json({error: "Failed to login"});
              }
              db.close();
          });
        } else if(req.params.collection === "colorschemes") {
            console.log("Saving colors");
            collection.insert(data, function(err, doc) {
                var col = db.collection("general");
                col.update({}, {$set:{colorscheme_id: doc.insertedIds[0]}}, function(err, docs) {
                    db.close();
                });
            });
            res.status(200).end();
        } else {
            collection.update({_id: ObjectId(data._id)}, data, {upsert: true});
            db.close();
            res.status(200).end();
        }
    });
});

var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Eucalyptus by Koala");
});
