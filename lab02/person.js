/* person.js 
 *
 * Author: Ian Christensen (igc2)
 * Class: CS-336
 * Date: September 12, 2018
 */

"use strict";

function Person(name, birth) {
    this.name = name;
    this.birth = birth;
    this.friends = [];
}

Person.prototype.setName = function(newName) {
    console.log(this.name + " has been renamed to " + newName);
    this.name = newName;
}

Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
}

Person.prototype.addFriend = function(newFriend) {
    this.friends.push(newFriend);
    console.log(this.name + " is now friends with " + newFriend);
}

Person.prototype.rmFriend = function(oldFriend) {
    this.friends.splice(this.friends.indexOf('oldFriend'), 1);
}

Person.prototype.greeting = function() {
    console.log("I am a person");
}

console.log("Testing");
var testDummy = new Person("Johnny", "05/23/1995");
testDummy.setName("Joe");
testDummy.getAge();
testDummy.addFriend("Bob");
testDummy.greeting();

function Student(name, birth, major) {
    Person.call(this, name, birth);
    this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.greeting = function() {
    console.log("I'm a student");
}

var testDummy2 = new Student("Jane", "07/02/1984", "Computer Science");
console.log(testDummy2.major);
testDummy2.greeting();
