var express = require('express');
var app = express();
var path = require('path');


app.use("/static/home", express.static('./client/build/home'));
app.use("/static/admin", express.static('./client/build/admin'));
app.use("/static/user", express.static('./client/build/user'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/home/index.html'));
});
app.get('/:sitename/admin', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/admin/index.html'));
});

app.get('/:sitename', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/user/index.html'));
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
