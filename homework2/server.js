/* server.js is a server for homework2
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
const host = "localhost";
const port = 3000;

// use a body parser for json encoded url data and specify the static folder
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

// container full of people objects
const people = [
{	firstName: 'George',
    lastName: 'Harrison',
    loginId: 'gh12',
    startDate: '03/15/1992', },

{	firstName: 'Paul',
    lastName: 'McCartney',
    loginId: 'jpm84',
    startDate: '08/01/1998', },

{	firstName: 'John',
    lastName: 'Lennon',
    loginId: 'jwl59',
    startDate: '11/34/1990', },

{	firstName: 'Richard',
    lastName: 'Starkey',
    loginId: 'rs03',
    startDate: '02/23/1995', }
];

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
app.get('/', (req, res) => res.sendFile(__dirname + '/public/addPerson.html'));

// respond to '/people' by sending the json data in people
app.get('/people', (req, res) => res.json(people))
    .post('/people', (req, res) => {
    for (let person of people) {
        if (person.loginId === req.body.loginId) {
        res.sendStatus(400);
        return;
        }
    }
    people.push(req.body);
    res.sendStatus(200);
});

// respond to '/person/:id' by sending the person's attributes
app.get('/person/:id', (req, res) => {
  const person = findPerson(res, req.params.id);
  if (person !== undefined) {
    res.json(person);
  }
});


app.delete('/person/:id', function(req, res) {
for(var i = 0; i < people.length; i++) {
    //console.log(peopleList[i].id);
    if (people[i].id == req.params.id) {
      delete people[i];
      res.send("Deleted the Person with ID=" + req.params.id);
    }
  }
  res.send( "404 Not found");
});

// respond to '/person/:id/name' by sending the person's full name
app.get('/person/:id/name', (req, res) => {
	const person = findPerson(req, req.params.id);
	if (person !== undefined) {
		res.json(`${person.firstName} ${person.lastName}`);
	}
});

// respond to '/person/:id/year' by sending the person's seniority
app.get('/person/:id/year', (req, res) => {
	const person = findPerson(res, req.params.id);
	if (person !== undefined) {
		res.json(getYear(person.startDate));
	}
});

// display a message on the console acknowleding that the app is running
app.listen(port, () => console.log(`homework2 listening on port ${port}!`));
