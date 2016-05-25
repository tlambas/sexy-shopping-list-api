'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _storage = require('./storage');

var storage = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3000;
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json()).get('/:collection', function (req, res) {
    var objects = storage.list(req.params.collection);

    if (objects) {
        res.json(objects);
    } else {
        res.status(404).send('Could not find collection: ' + req.params.collection);
    }
}).get('/:collection/:id', function (req, res) {
    var _req$params = req.params;
    var collection = _req$params.collection;
    var id = _req$params.id;


    var object = storage.find(collection, id);

    if (object) {
        res.json(object);
    } else {
        res.status(404).send('Could not find object with id "' + id + '" in collection "' + collection + '".');
    }
}).post('/:collection', function (req, res) {
    var saved = storage.add(req.params.collection, req.body);
    res.json(saved);
}).delete('/:collection/:id', function (req, res) {
    var _req$params2 = req.params;
    var collection = _req$params2.collection;
    var id = _req$params2.id;

    var wasFound = storage.remove(collection, id);

    if (wasFound) {
        res.send('Successfully removed ' + collection + ' id: ' + id);
    } else {
        res.status(404).send('Did not find ' + collection + ' id: ' + id);
    }
}).patch('/:collection/:id', function (req, res) {
    var _req$params3 = req.params;
    var collection = _req$params3.collection;
    var id = _req$params3.id;

    var body = req.body;

    var modName = storage.modify(collection, id, body);
    res.send('Modified name to ' + modName + ' for id: "' + id + '" in collection "' + collection + '".');
});

app.listen(PORT, function () {
    console.log('Listening http:/localhost:' + PORT);
});