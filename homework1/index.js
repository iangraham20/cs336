const express = require('express')
const index = express()
const port = 3000

const getSeniority = function() {
    var today = new Date();
    var startDate = new Date(this.startDate);
    var seniority = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        seniority--;
    }
    return seniority;
}

const getName = function() {
    var fullName = this.firstName + " " + this.lastName;
    console.log(fullName);
    return fullName;
}

const findPerson = (req, id) => {
	const person = people.find(person => person.loginID === id);
	if (person === undefined) {
		res.sendStatus(404);
	}
	return person;
}

const people = [
{	firstName: 'George',
    lastName: 'Harrison',
    loginID: 'Gharrison12',
    startDate: '03/15/1992', },

{	firstName: 'Paul',
    lastName: 'McCartney',
    loginID: 'Pmccartney84',
    startDate: '08/01/1998', },

{	firstName: 'John',
    lastName: 'Lennon',
    loginID: 'Jlennon59',
    startDate: '11/34/1990', },

{	firstName: 'Ringo',
    lastName: 'Starr',
    loginID: 'Rstarr03',
    startDate: '02/23/1995', }
];

index.get('/', (req, res) => res.send('CS336 Homework1'))

index.get('/people', (req, res) => res.json(people));

index.get('/people/:id/name', (req, res) => {
	const person = findPerson(req, req.params.id);
	if (person !== undefined) {
		res.json(`${person.firstName} ${person.lastName}`);
	}
});

index.get('/people/:id/year', (req, res) => {
	const person = findPerson(req, req.params.id);
	if (person !== undefined) {
		res.json(getSeniority(person.startDate));
	}
});

// index.listen('/', (req, res) => res.sendStatus(404));

index.listen(port, () => console.log(`Example app listening on port ${port}!`));