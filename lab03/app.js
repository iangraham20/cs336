/* app.js is the simplest Express app you can create
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */
 
// enforce strict syntax rules
"use strict";

/* exercise 3.1 */

// This app starts a server and listens on port 3000 for connections. 
// The app responds with “Hello World!” for requests to the root URL (/) or 
// route. For every other path, it will respond with a 404 Not Found
const express = require('express');
const app = express();
const port = 3001; // changed the port number

app.get('/', (req, res) => res.send('Hello, world!')); // added punctuation

app.listen(port, () => console.log(`app.js is listening on port ${port}!`));

/* exercise 3.2 */

app.get('/answers', (req, res) => res.sendFile(__dirname + '/public/txt/lab03.txt'));

/* exercise 3.2 */

// the express.static built-in middleware function in Express allows 
// you to serve static files such as images, CSS files, and JavaScript files

// app.use(express.static('public'));

// To create a virtual path prefix (where the path does not actually exist 
// in the file system) for files that are served by the express.static 
// function, specify a mount path for the static directory that allows you 
// to load the files that are in the public directory from the /static path prefix.

// app.use('/static', express.static('public'));

// If you run the express app from another directory, it’s safer to 
// use the absolute path of the directory that you want to serve
app.use(express.static(__dirname + '/public'));
