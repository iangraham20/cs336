/* addPerson-script.js
 *
 * Author: Ian Christensen
 * Prof: Vander Linden
 * Class: CS336 at Calvin College
 * Date: Fall, 2018
 */

$(document).ready(function() {
	// make variables based on the html
	let form = $("form");
	let result = $("#status");

	// if the input field has changed
	form.change(function() {
		// set result to empty string
		result = "";
	}

	// if the form has been submitted
	form.submit(function(event) {
		// prevents submission
		event.preventDefault();

		// call the forms method and action while stringifing the data
		$.ajax({
		    type: form.attr('method'),
		    url: form.attr('action'),
		    data: form.serialize(),
		})
		// output the Success and reset the form
		.done(function(res) {
			result.text("Success");
			form.trigger("reset");
		})
		// send necessary error codes
		.fail(function(xhr, status, error) {
			result.text("Error");
			console.log("Error: " + error);
			console.log("Status: " + status);
			console.dir(xhr);
		});
	});
});
