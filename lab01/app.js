/* app.js is the simplest Express app you can create and is the server for lab01
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

// enforce strict syntax rules
"use strict";

// import and instantiate an express application
const express = require('express');
const app = express();

// specify a host name and port number
const host = "localhost";
const port = 3000;

// specify the absolute path for static files (i.e. scripts, images, styles, etc.)
app.use(express.static(__dirname + '/public'));

// open the html file stored in the public folder directly
app.get('/', (req, res) => res.sendFile(__dirname + '/public/doc.html'));

// Notification that the server is running on a given host and port
app.listen(port, host, () => { console.log("listening on " + host + ":" + port + "..."); });
