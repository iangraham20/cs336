/* script.js implements the ajax for lab 7 Exercise 3
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

// Checks that the document is ready to display
$(document).ready(function() {
	// If the anchor/hyperlink is clicked on perform the following function
	$("button").click(function(event) {

		// create a variable that contains the data being sent out
		var dataVar;

		// Using the core $.ajax() method
		$.ajax({
			// The URL for the request
			url: "/hello",

			// The data to send (will be converted to a query string)
			data: { name: "Lab07" },
			
			// Whether this is a POST or GET request
    		type: "GET",
 
		    // The type of data we expect back
		    dataType: "json",
		})
		// Code to run if the request succeeds (is done);
		// The response is passed to the function
        .done(function(result) {
        	if (dataVar == null) {
	        	$("<em>No data yet...</em>").appendTo("body");
			}
	        dataVar = $("em")[0];
			dataVar.innerHTML = json.data;
		})
		// Code to run if the request fails; the raw request and
		// status codes are passed to the function
		.fail(function(xhr, status, errorThrown) {
    		if (dataVar == null) {
	        	$("<em>An error occurred!</em>").appendTo("body");
	        }
	        dataVar = $( "em" )[0];
			dataVar.innerHTML = "An error occurred!";
		})
		// Code to run regardless of success or failure;
		.always(function(xhr, status) {
			$(this).prop("disabled", true);
			alert("The request is complete!");
		});
	});
});
