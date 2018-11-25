/* app.js implements the server for homework3
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

"use_strict";

const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 3001));
app.set('host', (process.env.HOST || "localhost"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/app'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb://igc2:${process.env.MONGO_PASSWORD}@ds217350.mlab.com:17350/cs336`, function(err, client) {
  if (err) throw err;
  db = client;
  app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
});

/* Function: accessor for a person object's seniority
 * Precond: none
 * Postcond: none
 * @return seniority
 */
const getSeniority = (startDate) => {
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

app.get('/add', (req, res) => res.sendFile(__dirname + '/app/documents/addPerson.html'));
app.get('/get', (req, res) => res.sendFile(__dirname + '/app/documents/getPerson.html'));

app.get('/people', (req, res) => {
    db.collection('people').find().toArray(function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(data);
    });
})
.post('/people', (req, res) => {
    db.collection('people').insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
        startDate: req.body.startDate,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.sendStatus(200);
    });
});

app.get('/person/:id', (req, res) => {
    db.collection('people').findOne({
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
.put('/people', (req, res) => {
    db.collection('people').replaceOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
        startDate: req.body.startDate,
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.sendStatus(200);
    })
})
.delete('/person/:id', (req, res) => {
    db.collection('people').deleteOne({
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

app.get('/person/:id/name', (req, res) => {
    db.collection('people').findOne({
        "id": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(`${data.firstName} ${data.lastName}`);
        }
    })
});

app.get('/person/:id/year', (req, res) => {
    db.collection('people').findOne({
        "id": req.params.id, 
    }, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (data === null) {
            res.sendStatus(404);
        } else {
            res.json(`${data.firstName} ${data.lastName} has been with the company for ${getSeniority(data.startDate)} years.`);
        }
    })
});

app.all("*", (req, res) => {
    res.sendStatus(404);
});
