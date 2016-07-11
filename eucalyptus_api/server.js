var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/";
var fs = require('fs');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:database/currenttheme', function(req, res) {
    console.log("currenttheme");
    var themeUrl = null;
    var colorScheme = null;

    var readFile = function() {
        var responseText = null
        fs.readFile(`./themes/${themeUrl}.txt`, 'utf8', function(err, data) {
            if(err) {
                console.log('error', err);
            } else {
                console.log(data);
                responseText = data
                for(var key of Object.keys(colorScheme)) {
                    if(key !== '_id' && key !== 'name') {
                        var rg = new RegExp(key, 'g');
                        responseText = responseText.replace(rg, colorScheme[key]);
                    }
                }
                res.header('Content-Type', 'text/css')
                res.send(responseText);
            }
        })
    }

    var finishedRequest = function() {
        console.log('taggy', themeUrl, colorScheme);
        if(themeUrl && colorScheme) {
            readFile();
            return true;
        }
        return false;
    }

    MongoClient.connect(url + req.params.database, function(err, db) {
        var collection = db.collection('general');
        collection.find({}).toArray(function(err, docs) {
            console.log('general', docs);
            var collection2 = db.collection('themes');
            collection2.find({_id: docs[0].theme_id}).toArray(function(err, docs) {
                console.log('theme docs', docs);
                themeUrl = docs[0].url;
                if(finishedRequest()) {
                    db.close();
                }
            });
            var collection3 = db.collection('colorschemes');
            collection3.find({_id: docs[0].colorscheme_id}).toArray(function(err, docs) {
                console.log('color docs', docs);
                colorScheme = docs[0];
                if(finishedRequest()) {
                    db.close();
                }
            });
        });
    });

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
            search_obj = {page_id: ObjectId(req.params.id)};
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
            var colorscheme_id = null;
            var theme_id = null;

            var checkIfCompleted = function(){
                if(colorscheme_id && theme_id){
                    var collection2 = db.collection('general');
                    collection2.insert({sitename: req.params.database, base_url: "localhost:3000", admin_id: userdocs.insertedIds[0], index: 'home', colorscheme_id: colorscheme_id, theme_id: theme_id}, function(err, docs){
                        var collection3 = db.collection('pages');
                        collection3.insert({name: "Home Page", slug: 'home'}, function(err, docs) {
                            var elements = db.collection('elements');
                            elements.insert({etype: "h1", content: "Welcome to your site!", medialibrary_id: null, page_id: docs.insertedIds[0], order: 1})
                            res.json(userdocs)
                            db.close();
                        });
                    });
                }
            }
            var colorschemesall = db.collection('colorschemes');
            colorschemesall.insert({name: "Default", _background: "#365d9f", _headerBackground: "#682f3f", _headerText: "#3f36a4", _text: "#7e3347", _feature: "#7336a9"}, function(err, docs){
                colorscheme_id = docs.insertedIds[0];
                checkIfCompleted();
            });
            var themesall = db.collection('themes');
            themesall.insert({name: "Default", url: "default"}, function(err, docs){
                theme_id = docs.insertedIds[0];
                checkIfCompleted();
            })
        });

        // res.status(200).end();
  });
});

app.post('/:database/:collection', function(req, res) {
    var data = req.body;
    console.log("req", req.params.collection);
    console.log("req", req.params.database);
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
                element.page_id = ObjectId(element.page_id);
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
            collection.update({_id: ObjectId(data._id)}, data, {upsert: true}, function(err, docs){
                console.log("err", err);
                console.log("docs", docs);
            });
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
