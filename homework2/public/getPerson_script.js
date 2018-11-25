/* getPerson-script.js
 *
 * Author: Ian Christensen
 * Prof: Vander Linden
 * Class: CS336 at Calvin College
 * Date: Fall, 2018
 */

 $(document).ready(function() {
    let form = $("form");
    let result = $("#result");
    form.submit(function(event) {
		event.preventDefault();
		$.ajax({
		    type: form.attr('method'),
		    url: form.attr('action') + 
		    `/${(form.serializeArray())[0].value}`,
		})
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
	    .fail(function(xhr, status, error) {
		console.log("Error: " + error);
		console.log("Status: " + status);
		console.dir(xhr);
	    });
    });
});
