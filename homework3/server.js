/* server.js is a server for homework3
 *
 * Author: Ian Christensen
 * Prof: Vander Linden
 * Class: CS336 at Calvin College
 * Date: Fall, 2018
 */

// enforce strict syntax rules
"use_strict";

// import and instantiate an express server with a specified host and port
const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));

// use a body parser for json encoded url data and specify the static folder
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

// import the mongodb library
var MongoClient = require('mongodb').MongoClient;

// use the connect method to connect to the server
MongoClient.connect(`mongodb://igc2:${process.env.MONGO_PASSWORD}@ds217350.mlab.com:17350/cs336`, function(err, client) {
  if (err) throw err;
  db = client;
  app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
});

/* getYear: calculates the number of years since a specified date
 * Precondition: startDate must be a valid timestamp
 * Postcondition: N/A
 * Inputs: person object
 * Outputs: year, an integer
 */
const getYear = (startDate) => {
    var today = new Date();
    var startDate = new Date(startDate);
    let year = today.getFullYear() - startDate.getFullYear();
    const m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        year--;
    }
    return year;
}

/* findPerson: retrieves a person object given an ID number
 * Precondition: id must be a valid number
 * Postcondition: status 404 is sent on fail
 * Inputs: req, a request && id, an integer
 * Outputs: person object
 */
const findPerson = (res, id) => {
    const person = people.find(person => person.loginId === id);
    if (person === undefined) {
        res.sendStatus(404);
    }
    return person;
}

// respond to '/' by sending the addPerson file
app.get('/', (req, res) => res.sendFile(__dirname + '/public/documents/addPerson.html'));

// respond to '/people' by sending the json data in people
app.get('/people', (req, res) => {
    db.collection('people').find().toArray(function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(data);
    });
}).post('/people', (req, res) => {
    db.collection('people').insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginId: req.body.loginId,
        startDate: req.body.startDate,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.sendStatus(200);
    });
});

// respond to '/person/:id' by sending the person's attributes
app.get('/person/:id', (req, res) => {
    db.collection('people').findOne({
        "loginId": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    })
}).put('/people', (req, res) => {
    db.collection('people').replaceOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginId: req.body.loginId,
        startDate: req.body.startDate,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.sendStatus(200);
    })
}).delete('/person/:id', (req, res) => {
    db.collection('people').deleteOne({
        "loginID": req.params.id,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            res.sendStatus(404);
        }
    })
});

// respond to '/person/:id/name' by sending the person's full name
app.get('/person/:id/name', (req, res) => {
    db.collection('people').findOne({
        "loginId": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(`${data.firstName} ${data.lastName}`);
        }
    })
});

// respond to '/person/:id/year' by sending the person's seniority
app.get('/person/:id/year', (req, res) => {
    db.collection('people').findOne({
        "loginId": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(`${data.firstName} ${data.lastName} has been with the company for ${getYear(data.startDate)} years`);
        }
    })
});
