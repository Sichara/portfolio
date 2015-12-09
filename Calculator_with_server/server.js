var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require('path');
var app = express();
var fruites = [
  "Oranges",
  "Apples",
  "Melons",
  "Ananas"
];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

  res.sendFile(__dirname + '/public/index.html');
});


app.get('/fruites', function (req, res) {
  console.log(req.query);
  res.status(200).send(fruites);
})

app.post('/submit', function (req, res) {
  console.log(req.body);
  res.status(200).end();
})

app.post('/fruites', function (req, res) {
  if(req.body.fruite) {
    fruites.push(req.body.fruite);
    console.log('add to Array');
    res.status(200).send(fruites);
  }
})

app.put('/fruites/:index', function (req, res) {
  console.log(req.body);
  if(req.params.index && Number(req.params.index) < fruites.length && req.body.fruite) {
    fruites.splice(req.params.index, 1, req.body.fruite);
    console.log('Update in Array');
    res.status(200).send(fruites);
  } else {
    res.status(500).send('Bad request').end()
  }
})

app.delete('/fruites/:index', function (req, res) {
  if(req.params.index && Number(req.params.index) < fruites.length) {
    setTimeout(function () {
      fruites.splice(req.params.index, 1);
      res.status(200).send(fruites);
    }, 3000);

  } else {
    res.status(500).send('Bad request').end()
  }
})

app.get('/users', function (req, res) {
  console.log('Reuest recived!!!');
  res.sendFile('users.json',  { root: __dirname });
})

app.post('/sum', function (req, res) {
  console.log(req.body);
  if(req.body.a && req.body.b) {
    var result = parseFloat(req.body.a) + parseFloat(req.body.b);
    console.log(result);

    res.status(200).send(String(result));
  } else {
    res.status(500).send('not found');
  }
})

app.post('/mul', function (req, res) {
  console.log(req.body);
  if(req.body.a && req.body.b) {
    var result = parseFloat(req.body.a) * parseFloat(req.body.b);
    console.log("RESULT === " + result);
    res.status(200).send(String(result));
  } else {
    res.status(404).send('not found');
  }
})

app.post('/dif', function (req, res) {
  console.log(req.body);
  if(req.body.a && req.body.b) {
    var result = parseFloat(req.body.a) - parseFloat(req.body.b);
    console.log("RESULT === " + result);
    res.status(200).send(String(result));
  } else {
    res.status(404).send('not found');
  }
})

app.post('/div', function (req, res) {
  console.log(req.body);
  if(req.body.a && req.body.b) {
    var result = parseFloat(req.body.a) / parseFloat(req.body.b);
    console.log("RESULT === " + result);
    res.status(200).send(String(result));
  } else {
    res.status(404).send('not found');
  }
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:3000');
});
