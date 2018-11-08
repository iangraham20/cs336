/* person.js is an object prototype for a person
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */
 
// enforce strict syntax rules
"use strict";

/* Exercise 2.1 */

/* Function: constructor for a person object
 * Precond: the person's attributes do not violate restrictions inherent to their JS type
 * Postcond: the person object has the appropriate attributes
 * Params:  name, a string; birthday, a datestring;
 *			friends, a list of person objects; greeting, a string;
 * Returns: a person object
 */
function Person(name, birthday, friends, greeting) {
	this.name = name;
	this.birthday = birthday;
	this.friends = friends;
	this.greeting = greeting;
}

/* Function: accessor for a person object's name attribute
 * Precond: the person object has a name attribute
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: the name attribute of a person object
 */
 Person.prototype.getName = function() {
    console.log("This person's name is " + this.name);
    return this.name;
 }

/* Function: accessor for a person object's birthday attribute
 * Precond: the person object has a birthday attribute
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: the birthday attribute of a person object
 */
Person.prototype.getBirthday = function() {
    console.log("This person's birthday is " + this.birthday);
    return this.birthday;
}

/* Function: accessor for a person object's age derived from the birthday attribute
 * Precond: the person object has a birthday attribute
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: age, a datestring
 */
Person.prototype.getAge = function() {
    var today = new Date();
    var birthday = new Date(this.birthday);
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    console.log("This person's age is " + age);
    return age;
}

/* Function: accessor for a person object's friends attribute 
 * Precond: the person object has friends array (could be empty)
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: friendString, a string
 */
Person.prototype.getFriends = function() {
    if (this.friends.length < 1) {
        console.log("This person has no friends");
        return this.friends;
    } else {
        var friendString = this.friends[0];
        for (var i = 1; i < this.friends.length - 1; i++) {
            friendString = friendString.concat(", ", this.friends[i]);
        }
        friendString = friendString.concat(", and ", this.friends[this.friends.length - 1]);

        console.log("This person's friends are " + friendString);
        return friendString;
    }
}

/* Function: accessor for a person object's greeting
 * Precond: the person object has a greeting attribute
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: this.greeting, the person object's greeting attribute
 */
Person.prototype.getGreeting = function() {
    console.log(this.name + " says \"" + this.greeting + "\"");
    return this.greeting;
}

/* Function: mutator for a person object's name attribute
 * Precond: newName is a valid string
 * Postcond: a message has been displayed in the console
 * Params: newName, a string
 * Returns: none
 */
 Person.prototype.setName = function(newName) {
 	console.log(this.name + " has been renamed to " + newName);
 	this.name = newName;
 }

/* Function: mutator for a person object's birthday attribute
 * Precond: the person object has a birthday attribute
 * Postcond: a message has been displayed in the console
 * Params: newBirthday, a datestring
 * Returns: none
 */
Person.prototype.setBirthday = function(newBirthday) {
	console.log(this.name + "'s " + this.birthday + " has been changed to " + newBirthday);
	this.birthday = newBirthday;
}

/* Function: mutator for a person object's friends attribute
 * Precond: the person object has a friends attribute represented as a list
 * Postcond: a message has been displayed in the console
 * Params: friendsName, a string
 * Returns: none
 */
Person.prototype.setFriends = function(friendsName) {
	if (this.friends.includes(friendsName)) {
		console.log(this.name + " lost a friend named " + friendsName);
		this.friends.splice(this.friends.indexOf(friendsName), 1);
	} else {
		console.log(this.name + " gained a new friend named " + friendsName);
		this.friends.push(friendsName);
	}
}

/* Function: mutator for a person object's greeting
 * Precond: newGreeting is a valid string
 * Postcond: a message has been displayed in the console
 * Params: newGreeting, a string
 * Returns: none
 */
Person.prototype.setGreeting = function(newGreeting) {
	console.log(this.name + "'s new greeting is \"" + newGreeting + "\"");
	this.greeting = newGreeting;
}

/* Function: unit test for the person object and its methods
 * Precond: none
 * Postcond: all the tests passed
 * Params: none
 * Returns: none
 */
function personTest() {
	console.log("Testing the person class:");
	var assert = require('assert');

	console.log("Testing constructor... ");
	var person0 = new Person("John", "05/23/1995", ["Jake", "Bill", "Tom"], "hello!");
	console.log("Constructor passed!");

	console.log("Testing accessors...");
	assert(person0.getName() == "John");
	assert(person0.getBirthday() == "05/23/1995");
	assert(person0.getAge() == 23);
	assert(person0.getFriends() == "Jake, Bill, and Tom");
	assert(person0.getGreeting() == "hello!");
	console.log("Accessors passed!");

	console.log("Testing mutators... ");
	person0.setName("Dan");
	person0.setBirthday("05/17/1998");
	person0.setFriends("Greg");
	person0.setFriends("Jake");
	person0.setGreeting("hi there!");
	assert(person0.getName() == "Dan");
	assert(person0.getBirthday() == "05/17/1998");
	assert(person0.getAge() == 20);
	person0.getFriends();
	assert(person0.getFriends() == "Bill, Tom, and Greg");
	assert(person0.getGreeting() == "hi there!");
	console.log("Mutators passed!");
}

// run the unit test for person
personTest();

/* Exercise 2.2 */


/* Function: constructor for a student object
 * Precond: the student's attributes do not violate restrictions inherent to their JS type
 * Postcond: the student object has the appropriate attributes
 * Params:  name, a string; birthday, a datestring;
 *          friends, a list of person or student objects;
 *          greeting, a string; major, a string
 * Returns: a student object
 */
function Student(name, birthday, friends, greeting, major) {
    Person.call(this, name, birthday, friends, greeting);
    this.major = major;
}

//
Student.prototype = Object.create(Person.prototype);

/* Function: accessor for a student object's major attribute
 * Precond: the student object has a major attribute
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: this.major, the major attribute of a student object
 */
Student.prototype.getMajor = function() {
	console.log("This student's major is " + this.major);
	return this.major;
}

/* Function: mutator for a student object's major attribute
 * Precond: the student object has a major attribute
 * Postcond: a message has been displayed in the console
 * Params: newMajor, a string
 * Returns: none
 */
Student.prototype.setMajor = function(newMajor) {
	console.log(this.name + "changed majors to " + newMajor);
	this.major = newMajor;
}


/* Function: accessor for a student object's greeting
 * Precond: the student object has a greeting attribute
 * Postcond: a message has been displayed in the console
 * Params: none
 * Returns: this.greeting, the student object's greeting attribute;
 *          this.major, the student object's major attribute;
 */
Student.prototype.studentGreeting = function() {
    console.log(this.greeting + " I'm a Calvin College student majoring in " + this.major);
    return this.greeting + "I'm a Calvin College student majoring in " + this.major;
}

/* Function: unit test for the student object and its methods
 * Precond: none
 * Postcond: all the tests passed
 * Params: none
 * Returns: none
 */
function studentTest() {
	console.log("Testing the student class:");
	var assert = require('assert');

	console.log("Testing constructor... ");
	var student0 = new Student("John", "05/23/1995", ["Jake", "Bill", "Tom"], "hello!", "Computer Science");
	console.log("Constructor passed!");

	console.log("Testing accessors...");
	assert(student0.getName() == "John");
	assert(student0.getBirthday() == "05/23/1995");
	assert(student0.getAge() == 23);
	assert(student0.getFriends() == "Jake, Bill, and Tom");
	assert(student0.getGreeting() == "hello!");
	student0.getMajor()
	assert(student0.getMajor() == "Computer Science");
	console.log("Accessors passed!");

	console.log("Testing mutators... ");
	student0.setName("Dan");
	student0.setBirthday("05/17/1998");
	student0.setFriends("Greg");
	student0.setFriends("Jake");
	student0.setGreeting("hi there!");
	student0.setMajor("Information Systems");
	assert(student0.getName() == "Dan");
	assert(student0.getBirthday() == "05/17/1998");
	assert(student0.getAge() == 20);
	assert(student0.getFriends() == "Bill, Tom, and Greg");
	assert(student0.getGreeting() == "hi there!");
	assert(student0.getMajor() == "Information Systems");
	console.log("Mutators passed!");
} 

// run the unit test for the student object
studentTest();
