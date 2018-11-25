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

/* Function: mutator for a person in a json data structure
 * Precond: none
 * Postcond: if the person was null send a 404 status
 * @param id
 * @return person
 */
const setPerson = (req) => {
    const person = people.find(people => people.loginId === req.params.id);
    if (person === null) {
        res.sendStatus(404);
    } else {
        person.firstName = req.params.firstName;
        person.lastName = req.params.lastName;
        person.loginId = req.params.loginId;
        person.startDate = req.params.startDate;
        return person;
    }
}

/* Function:
 * Precond: 
 * Postcond: if the person was null send a 404 status
 * @param id
 */
const removePerson = (id) => {
    const personIndex = people.findIndex(people => people.loginId === id);
    if (personIndex === null) {
        res.sendStatus(404);
    } else {
        people.splice(personIndex, 1);
    }
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
    const person = getPerson(req.params.id);
    if (person !== undefined) {
        res.json(person);
    } else {
        res.sendStatus(404);
    }
})
.put('/person/:id', (req, res) => {
    // TODO: some reason req has only a loginId
    const person = setPerson(req);
    if (person !== undefined) {
        res.json(person);
    } else {
        res.sendStatus(404);
    }
})
.delete('/person/:id', function(req, res) {
    const person = getPerson(req.params.id);
    if (person !== undefined) {
        removePerson(req.params.id);
        res.send("Deleted the person with the loginId " + req.params.id);
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

// display a message on the console acknowleding that the app is running
app.listen(port, () => console.log(`homework2 listening on port ${port}!`));
