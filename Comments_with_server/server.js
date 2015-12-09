var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require('path');
var app = express();
var fruites = [
    {
        item: 'Oranges',
        price: '10'
    },
    {
        item: 'Oranges',
        price: '10'
    }
];

var comments = [
    {
        author: 'Jack Jones',
        date: new Date(),
        text: 'Hello world, loremfdsjfkhlajskdhfk',
        id: 0
    },
    {
        author: 'John Smith',
        date: new Date(),
        text: 'Hello world, loremfdsjfkhlajskdhfk',
        id: 1
    }
];
var id = _.max(comments, function (item) {
        return item.id;
    }).id + 1;

console.log('>>>>>' + id);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/public/index.html');
});


app.get('/fruites', function (req, res) {
    setTimeout(function () {
        res.status(200).send(fruites);
    }, 3000);
});

app.post('/submit', function (req, res) {
    console.log(req.body);
    res.status(200).end();
});

app.post('/fruites', function (req, res) {
    console.log(req.body.item);
    if (req.body.item) {
        fruites.push(req.body.item);
        console.log('add to Array');
        res.status(200).send(fruites);
    } else {
        res.status(404).send('not faund');
    }
});

app.put('/fruites/:index', function (req, res) {
    console.log(req.body);
    if (req.params.index && Number(req.params.index) < fruites.length && req.body.fruite) {
        fruites.splice(req.params.index, 1, req.body.fruite);
        console.log('Update in Array');
        res.status(200).send(fruites);
    } else {
        res.status(500).send('Bad request').end()
    }
});

app.delete('/fruites/:index', function (req, res) {
    if (req.params.index && Number(req.params.index) < fruites.length) {
        setTimeout(function () {
            fruites.splice(req.params.index, 1);
            res.status(200).send(fruites);
        }, 3000);

    } else {
        res.status(500).send('Bad request').end()
    }
});
//==================================

app.get('/comment', function (req, res) {
    setTimeout(function () {
        res.status(200).send(comments);
    }, 1000);
});

app.post('/comment', function (req, res) {
    var data = req.body;

    if (req.body) {
        data.id = _.max(comments, function (item) {
                return item.id;
            }).id + 1;
        data.date = new Date();

        comments.push(data);
        console.log('add to Array');
        res.status(200).send(comments);
    } else {
        res.status(500).send('Bad request');
    }
});

app.put('/comment/:id', function (req, res) {
    console.log(req.body);
    var index = null;
    var data = req.body;

    if (req.params.id && req.body) {
        index = comments.indexOf(_.find(comments, function (item) {
            return item.id === Number(req.params.id);
        }));
        data.date = new Date();

        comments[index] = data;

        res.status(200).send(comments);
    } else {
        res.status(500).send('Bad request').end()
    }
});

app.delete('/comment/:index', function (req, res) {
    var index;
    if (req.params.index) {
        setTimeout(function () {
            index = comments.indexOf(_.find(comments, function (item) {
                return item.id === Number(req.params.index);
            }));

            if (index === -1) {
                res.status(404).send('Not found');

                return;
            }

            comments.splice(index, 1);
            id--;
            res.status(200).send(comments);
        }, 1000);

    } else {
        res.status(500).send('Bad request').end()
    }
});

//==================================
app.get('/users', function (req, res) {
    console.log('Reuest recived!!!');
    res.sendFile('users.json', {root: __dirname});
});

app.post('/sum', function (req, res) {
    if (req.body.a && req.body.b) {
        var result = parseFloat(req.body.a) + parseFloat(req.body.b);
        console.log(result);

        res.status(200).send(String(result));
    } else {
        res.status(404).send('not found');
    }
});

app.post('/mul', function (req, res) {
    console.log(req.body);
    if (req.body.a && req.body.b) {
        var result = parseFloat(req.body.a) * parseFloat(req.body.b);
        console.log("RESULT === " + result);
        res.status(200).send(String(result));
    } else {
        res.status(404).send('not found');
    }
});

app.post('/dif', function (req, res) {
    console.log(req.body);
    if (req.body.a && req.body.b) {
        var result = parseFloat(req.body.a) - parseFloat(req.body.b);
        console.log("RESULT === " + result);
        res.status(200).send(String(result));
    } else {
        res.status(404).send('not found');
    }
});

app.post('/div', function (req, res) {
    console.log(req.body);
    if (req.body.a && req.body.b) {
        var result = parseFloat(req.body.a) / parseFloat(req.body.b);
        console.log("RESULT === " + result);
        res.status(200).send(String(result));
    } else {
        res.status(404).send('not found');
    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:3000');
});
