/* server.js implements the server for homework 3
 *
 * Author: Ian Christensen, Derek Fisher, Cameron Dewey
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

"use_strict";

// create the app with a set port and host
const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));

// create a bodyparser and declare the static folder
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/app'));

// Middleware for the headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Create a Mongo client and connect to the server
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb://igc2:${process.env.MONGO_PASSWORD}@ds217350.mlab.com:17350/cs336`, function(err, client) {
  if (err) throw err;
  db = client;
  app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
});

/* Function: calculates the number of years since a given start date
 * Precond: The start date is a valid date string
 * Postcond: The number of years is returned
 * @param startDate
 * @return seniority
 */
const getYears = (startDate) => {
    var today = new Date();
    var startDate = new Date(startDate);
    var seniority = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        seniority--;
    } else {
        return seniority;
    }
}

// specify the GET and POST commands for the items route
app.get('/items', (req, res) => {
    db.collection('items').find().toArray(function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(data);
    });
})
.post('/items', (req, res) => {
    db.collection('items').insertOne({
        id: req.body.id,
        name: req.body.name,
        origin: req.body.origin,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        manufactureDate: req.body.manufactureDate,
        significance: req.body.significance,
        relatedItems: req.body.relatedItems,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.sendStatus(200);
    });
});

// Specify the GET, PUT, and DELETE commands for any given id
app.get('/item/:id', (req, res) => {
    db.collection('items').findOne({
        "id": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    })
})
.put('/items', (req, res) => {
    db.collection('items').replaceOne({
        id: req.body.id,
        name: req.body.name,
        origin: req.body.origin,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        manufactureDate: req.body.manufactureDate,
        significance: req.body.significance,
        relatedItems: req.body.relatedItems,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.sendStatus(200);
    })
})
.delete('/item/:id', (req, res) => {
    db.collection('items').deleteOne({
        "id": req.params.id,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            res.sendStatus(404);
        }
    })
});

// Specify the GET command for any given name
app.get('/item/:id/name', (req, res) => {
    db.collection('items').findOne({
        "id": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(`${data.name}`);
        }
    })
});

// Specify the GET command for any given year
app.get('/item/:id/year', (req, res) => {
    db.collection('items').findOne({
        "id": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(`${data.name} was manufactured ${getYears(data.manufactureDate)} years ago.`);
        }
    })
});

// Catch any other possible routes with a 404 status
app.all("*", (req, res) => {
    res.sendStatus(404);
});
