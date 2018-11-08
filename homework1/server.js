/* server.js is the express server used to run homework1
 * 
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A
 * Fall, 2018
 */

// enforce strict syntax rules
"use_strict";

// import and instantiate an express server
const express = require('express');
const app = express();

// specify the host name and port number for the server
const host = "localhost";
const port = 3000;

// Specify the absolute path for the static files
app.use(express.static(__dirname + '/assets'));

// create a json data structure containing people
const people = [
{   firstName: 'George',
    lastName: 'Harrison',
    loginID: 'Gharrison12',
    startDate: '03/15/1992', },

{   firstName: 'Paul',
    lastName: 'McCartney',
    loginID: 'Pmccartney84',
    startDate: '08/01/1998', },

{   firstName: 'John',
    lastName: 'Lennon',
    loginID: 'Jlennon59',
    startDate: '11/34/1990', },

{   firstName: 'Ringo',
    lastName: 'Starr',
    loginID: 'Rstarr03',
    startDate: '02/23/1995', }
];

/* Function: accessor for a person object's seniority
 * Precond: none
 * Postcond: none
 * Parameters: none
 * Returns: seniority, the person's seniority
 */
const getSeniority = (startDate) => {
    var today = new Date();
    var startDate = new Date(startDate);
    var seniority = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        seniority--;
    }
    return seniority;
}

/* Function: accessor for a person in a json data structure
 * Precond: none
 * Postcond: if the person was null send a 404 status
 * Parameters: req, a http request; id, a person id#
 * Returns: person, a person object
 */
const findPerson = (req, id) => {
	const person = people.find(person => person.loginID === id);
	if (person === null) {
		res.sendStatus(404);
	}
	return person;
}

app.get('/', (req, res) => { res.sendFile(__dirname + '/assets/documents/doc.html'); });

// respond to '/people' by sending the json data in people
app.get('/people', (req, res) => res.json(people));

// respond to '/person/:id' by sending the person's attributes
app.get('/person/:id', (req, res) => {
	const person = findPerson(req, req.params.id);
	if (person !== undefined) {
		res.json(person);
	}
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
	const person = findPerson(req, req.params.id);
	if (person !== undefined) {
		res.json(`${person.firstName} has been with the company for ${getSeniority(person.startDate)} years.`);
	}
});

// notify via the console that the application is running on the specified host and port
app.listen(port, host, () => { console.log("listening on " + host + ":" + port + "..."); });
