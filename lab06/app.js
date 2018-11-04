/* app.js is the simplest Express app you can create
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

// require http status codes and the json bodyParser
const httpStatus = require('http-status-codes');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Notification that the server is running on a given host and port
app.listen(port, host, () => {
    console.log("listening on " + host + ":" + port + "...");
});

// To avoid code redundancy in our request methods
// this function handles the responses that need the request body
const responseWithBody = (req, res, method) => {
  res.status(200);
  res.send(`Method ${method} was used to display the following: ${json.stringify(req.body)}`);
}

// To avoid code redundancy in our request methods
// this function handles the responses that do not need the request body
const response = (req, res, method) => {
  res.status(200);
  res.send(`Hello ${method}`);
}

// Each method can be seperate but because they all respond to the 
// same route it takes less space and time to chain the commands
// Respond to GET, POST, PUT, DELETE, and HEAD to the /request route:
app.get('/request', (req, res) => response(req, res, 'GET'))
	.post('/request', (req, res) => responseWithBody(req, res, 'POST'))
	.put('/request', (req, res) => responseWithBody(req, res, 'PUT'))
	.delete('/request', (req, res) => response(req, res, 'DELETE'))
	.head('/request', (req, res) => response(req, res, 'HEAD'))
	.all('/request', (req, res) => res.sendStatus(501));

// Respond to POST to the /forms route:
app.post('/forms', (req, res) => responseWithBody(req, res, 'POST'));
