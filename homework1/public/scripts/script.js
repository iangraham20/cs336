/* script.js is the script that implements the backend operations of homework1
 * 
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A
 * Fall, 2018
 */

///////////////////////////////////////////////////////
// This was an attempt to use an external module to  //
// create person objects, however a simpler approach //
// was to simply hardcode values in the server file  //
///////////////////////////////////////////////////////

// enforce strict syntax rules
"use_strict";

module.exports = class Person {
	/* Function: constructor for a person object
	 * Precond: the person's attributes do not violate restrictions inherent to their JS type
	 * Postcond: the person object has the appropriate attributes
	 * Params:  firstName, a string; lastName, a string;
	 *			loginID, a unique string; startDate, a datestring;
	 * Returns: a person object
	 */
	person(firstName, lastName, loginID, startDate) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.loginID = loginID;
		this.startDate = startDate;
	}

	/* Function: accessor for a person object's firstName attribute
	 * Precond: the person object has a firstName attribute
	 * Postcond: a message has been displayed in the console
	 * Params: none
	 * Returns: the firstName attribute of a person object
	 */
	getFirstName() {
	   console.log("This person's first name is " + this.firstName);
	   return this.firstName;
	}

	/* Function: accessor for a person object's lastName attribute
	 * Precond: the person object has a lastName attribute
	 * Postcond: a message has been displayed in the console
	 * Params: none
	 * Returns: the lastName attribute of a person object
	 */
	getLastName() {
	   console.log("This person's last name is " + this.lastName);
	   return this.lastName;
	}

	/* Function: accessor for a person object's loginID attribute
	 * Precond: the person object has a loginID attribute
	 * Postcond: a message has been displayed in the console
	 * Params: none
	 * Returns: the loginID attribute of a person object
	 */
	getLoginID() {
		console.log("This person's login ID is " + this.loginID);
		return this.loginID;
	}

	/* Function: accessor for a person object's loginID attribute
	 * Precond: the person object has a loginID attribute
	 * Postcond: a message has been displayed in the console
	 * Params: none
	 * Returns: the loginID attribute of a person object
	 */
	startDate() {
	    console.log("This person's start date is " + this.startDate);
	    return this.startDate;
	}
}
