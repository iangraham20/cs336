/* script-javascript.js implements the jQuery in exercise 7.1
 * 
 * Class: CS336 with Prof. Vander Linden
 * Author: Ian Christensen
 * Date: Fall, 2018
 */

"use strict";

$(document).ready(function() {
$(".widget input[type=submit], .widget a, .widget button").button();
$("button, input, a").click( function(event) {
	$("<em>", {html: "no data yet..."}).appendTo("body");
	$(this).prop("disabled",true);
	});
});
