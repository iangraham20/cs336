/* script.js implements the jquery-ui for lab 7 Exercise 2
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
		// create emphasized text in the html document and disable the button
		$("<em>", {html: "no data yet..."}).appendTo("body");
		$(this).prop("disabled", true);
	});
});
