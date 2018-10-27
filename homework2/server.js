/* server.js is a server for homework2
 *
 * Author: Ian Christensen
 * Prof: Vander Linden
 * Class: CS336 at Calvin College
 * Date: Fall, 2018
 */

// import and create an express app on port 3000
const express = require('express');
const app = express();
const port = 3000;

// middleware that extracts the request data
const bodyParser = require('body-parser');
// set the bodyparser to parse the text as URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// set the bodyparser to parse json encoded data
app.use(bodyParser.json());
// set the default directory and make it static
app.use('/', express.static(__dirname + '/public'));

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

/* getName: concatenates a first and last name
 * Precondition: firstName and lastName must be valid strings
 * Postcondition: fullname is printed to the console
 * Inputs: person object
 * Outputs: fullName, a string
 */
const getName = function() {
    var fullName = this.firstName + " " + this.lastName;
    console.log(fullName);
    return fullName;
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
        // loginID doesn’t exist or the required data is missing or incomplete
		res.sendStatus(404);
	}
	return person;
}

// container full of people objects
const people = [
{	firstName: 'George',
    lastName: 'Harrison',
    loginId: 'Gharrison12',
    startDate: '03/15/1992', },

{	firstName: 'Paul',
    lastName: 'McCartney',
    loginId: 'Pmccartney84',
    startDate: '08/01/1998', },

{	firstName: 'John',
    lastName: 'Lennon',
    loginId: 'Jlennon59',
    startDate: '11/34/1990', },

{	firstName: 'Ringo',
    lastName: 'Starr',
    loginId: 'Rstarr03',
    startDate: '02/23/1995', }
];

/* get: retrieves the submission page
 * Precondition: addPerson.html must exist
 * Postcondition: addPerson.html is displayed
 * Inputs: req, a request && res, a response
 * Outputs: N/A
 */
app.get('/', (req, res) => res.sendFile(__dirname + '/public/addPerson.html'));

/* get people: retrieves a list of people objects
 * Precondition: loginId numbers must be unique
 * Postcondition: a list of people objects is displayed
 * Inputs: req, a request && res, a response
 * Outputs: nothing
 */
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

/* get id: retrieves the record of the person with the given id
 * Precondition: id must be a valid string
 * Postcondition: the person object is displayed
 * Inputs: req, a request && res, a response
 * Outputs: N/A
 */
app.get('/person/:id', (req, res) => {
  const person = findPerson(res, req.params.id);
  if (person !== undefined) {
    res.json(person);
  }
});

/* get name: retrieves the fullname of the person with the given id
 * Precondition: id must be a valid string
 * Postcondition: the person's fullname is displayed
 * Inputs: req, a request && res, a response
 * Outputs: N/A
 */
app.get('/person/:id/name', (req, res) => {
	const person = findPerson(req, req.params.id);
	if (person !== undefined) {
		res.json(`${person.firstName} ${person.lastName}`);
	}
});

/* get year: retrieves the seniority of the person with the given id
 * Precondition: id must be a valid string
 * Postcondition: the person's seniority is displayed
 * Inputs: req, a request && res, a response
 * Outputs: N/A
 */
app.get('/person/:id/years', (req, res) => {
	const person = findPerson(res, req.params.id);
	if (person !== undefined) {
		res.json(getYear(person.startDate));
	}
});

// display a message on the console acknowleding that the app is running
app.listen(port, () => console.log(`homework2 listening on port ${port}!`));
