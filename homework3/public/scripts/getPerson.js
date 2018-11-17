/* getPerson-script.js
 *
 * Author: Ian Christensen
 * Prof: Vander Linden
 * Class: CS336 at Calvin College
 * Date: Fall, 2018
 */

 $(document).ready(function() {
 	// make variables based on the html
    let form = $("form");
    let result = $("#result");

    // if there is a submission
    form.submit(function(event) {
    	// prevent the submission
		event.preventDefault();

		// call the method and action while stringifing the array of values
		$.ajax({
		    type: form.attr('method'),
		    url: form.attr('action') + 
		    `/${(form.serializeArray())[0].value}`,
		})
		// reset the form and display the result
	    .done(function(res) {
		form.trigger("reset");
		result.html(`
                    <div id="result">
                        <h1>${res.firstName} ${res.lastName}</h1>
                        <div>Login ID: ${res.loginId}</div>
                        <div>Start Date: ${res.startDate}</div>
                    </div>`
                );
	    })
	    // send necessary error codes
	    .fail(function(xhr, status, error) {
		console.log("Error: " + error);
		console.log("Status: " + status);
		console.dir(xhr);
	    });
    });
});
