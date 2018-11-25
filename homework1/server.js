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
app.use(express.static(__dirname + '/public'));

// create a json data structure containing people
const people = [
{   firstName: 'George',
    lastName: 'Harrison',
    loginId: 'gh12',
    startDate: '03/15/1992', },

{   firstName: 'Paul',
    lastName: 'McCartney',
    loginId: 'jpm84',
    startDate: '08/01/1998', },

{   firstName: 'John',
    lastName: 'Lennon',
    loginId: 'jwl59',
    startDate: '11/34/1990', },

{   firstName: 'Richard',
    lastName: 'Starkey',
    loginId: 'rs03',
    startDate: '02/23/1995', }
];

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

/* Function: accessor for a person in a json data structure
 * Precond: none
 * Postcond: if the person was null send a 404 status
 * @param id
 * @return person
 */
const getPerson = (id) => {
	const person = people.find(people => people.loginId === id);
	if (person === null) {
		res.sendStatus(404);
	} else {
        return person;
    }
}

/* Function: accessor for a person object's name
 * Precond: id matches a person id
 * Postcond: not found status is sent
 * @param id
 * @return name
 */
const getName = (id) => {
    const person = people.find(people => people.loginId === id);
    if (person === null) {
        res.sendStatus(404);
    } else {
        const name = person.firstName + " " + person.lastName;
        return name;
    }
}

app.get('/', (req, res) => { res.sendFile(__dirname + '/public/documents/doc.html'); });

// respond to '/people' by sending the json data in people
app.get('/people', (req, res) => res.json(people));

// respond to '/person/:id' by sending the person's attributes
app.get('/person/:id', (req, res) => {
	const person = getPerson(req.params.id);
	if (person !== undefined) {
		res.json(person);
	} else {
        res.sendStatus(404);
    }
});

// respond to '/person/:id/name' by sending the person's full name
app.get('/person/:id/name', (req, res) => {
	const name = getName(req.params.id);
	if (name !== undefined) {
		res.json(name);
	} else {
        res.sendStatus(404);
    }
});

// respond to '/person/:id/year' by sending the person's seniority
app.get('/person/:id/year', (req, res) => {
	const person = getPerson(req.params.id);
	if (person !== undefined) {
		res.json(`${getName(req.params.id)} has been with the company for ${getSeniority(person.startDate)} years.`);
	} else {
        res.sendStatus(404);
    }
});

app.all("*", (req, res) => {
    res.sendStatus(404);
});

// notify via the console that the application is running on the specified host and port
app.listen(port, host, () => { console.log("listening on " + host + ":" + port + "..."); });
