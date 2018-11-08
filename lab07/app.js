/* app.js implements the server for lab 7
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

// enfore strict syntactical rules
"use_strict";

// import and instantiate an express application
const express = require('express');
const app = express();

// specify a host name and port number
const host = "localhost";
const port = 3000;

// require http status codes and the json bodyParser
const httpStatus = require('http-status-codes');
const bodyParser = require('body-parser');

// specify that the bodyparser will be parsing url encoded json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// create a static folder
app.use(express.static('public'));

// open the correct html file for each of the three exercises
app.get('/jquery', (req, res) => res.sendFile(__dirname + "/public/lab07_1.html"));
app.get('/jquery-ui', (req, res) => res.sendFile(__dirname + "/public/lab07_2.html"));
app.get('/ajax', (req, res) => res.sendFile(__dirname + "/public/lab07_3.html"));

// send json data through the /hello route
app.get("/hello", (req, res) => res.send({data: "Hello, Lab07!"}));

// notify the user that the application is running
app.listen(port, host, () => { console.log("listening on " + host + ":" + port + "..."); });
