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
app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.HOST || "localhost"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/app'));

var fs = require('fs');
var path = require('path');
var PEOPLE_FILE = path.join(__dirname, 'people.json');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/people', function(req, res) {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/people', function(req, res) {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        var newPerson = {
            id: Date.now(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        people.push(newPerson);
        fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(people);
        });
    });
});

app.listen(app.get('port'), function() { console.log('Server started: http://localhost:' + app.get('port') + '/'); });
