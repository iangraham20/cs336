/* script.js implements the jquery for lab 7 Exercise 1
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

// Checks that the document is ready to display
$(document).ready(function() {
	// If the anchor/hyperlink is clicked on perform the following function
	$("a").click(function(event) {
		// Alert the user that the default functionality will be prevented
		alert("The link will no longer take you to jquery.com");
		event.preventDefault();
	});
});
