/* script-jquery.js implements the AJAX in exercise 7.3
 * 
 * Class: CS336 with Prof. Vander Linden
 * Author: Ian Christensen
 * Date: Fall, 2018
 */

"use strict";

$(document).ready(function () {
    $("button").click(function(event) {
        $("#result").text('no data yet...');
        $.ajax({
            url: "hello",
            data: { name: "Lab 07" },
            type: "GET",
        })
        .done(function(result) {
            $("#result").text(result);
        })
        .fail(function(xhr, status, errorThrown) {
            $("#result").text("Something went wrong.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });
    });
});
