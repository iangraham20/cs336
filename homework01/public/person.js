"use strict";

function Person(firstName, lastName, loginID, startDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginID = loginID;
    this.startDate = startDate;
}

Person.prototype.getName = function() {
    var fullName = this.firstName + " " + this.lastName;
    console.log(fullName);
    return fullName;
}

Person.prototype.getSeniority = function() {
    var today = new Date();
    var startDate = new Date(this.startDate);
    var seniority = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        seniority--;
    }
    console.log(seniority);
    return seniority;
}

