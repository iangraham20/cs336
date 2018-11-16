/* addPerson-script.js
 *
 * Author: Ian Christensen
 * Prof: Vander Linden
 * Class: CS336 at Calvin College
 * Date: Fall, 2018
 */

function loadPeople() {
  let peopleList = $("#people-list");
  peopleList.empty();
  $.ajax({
      type: "GET",
      url: "/people",
  })
  .done(function(res) {
    for (person of res) {
      peopleList.append(`
          <div>
              <h1>${person.firstName} ${person.lastName}</h1>
              <div>Login ID: ${person.loginId}</div>
              <div>Start Date: ${person.startDate}</div>
          </div>`
      );
    }
  })
  .fail(function(xhr, status, error) {
    console.log("Error: " + error);
    console.log("Status: " + status);
    console.dir(xhr);
  });
}

$(document).ready(function() {
 	loadPeople();

	// make variables based on the html
	let form = $("form");
	let result = $("#status");

	// if the input field has changed
	form.change(function() {
		// set result to empty string
		result.text("");
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
			loadPeople();
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
