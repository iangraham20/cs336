/* app.js is the simplest Express app you can create
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

// enforce strict syntax rules
"use strict";

// This app starts a server and listens on port 3000 for connections. 
// The app sends an html document for requests to the root URL (/) or 
// route. For every other path, it will respond with a 404 Not Found
const express = require('express');
const app = express();
const port = 3000;

// Open the html file directly
app.get('/', (req, res) => res.sendFile(__dirname + '/public/doc.html'));

// Notification that the server is running and on what port
app.listen(port, () => console.log(`app.js is listening on port ${port}!`));

// Specify the absolute path for the static files
app.use(express.static(__dirname + '/public'));
