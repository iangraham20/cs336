/*
 * This implements some HTTP method/code
 */

const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');
const HOST = "localhost";
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var HttpStatus = require('http-status-codes');

// app.all('/request', function(req, res) {
// 	res.sendstatus(501);
// });

app.get('/request', function(req, res) {
    res.send("Hello, GET!");
});

app.put('/request', function(req, res) {
    res.send("Hello, PUT!");
});

app.post('/request', function(req, res) {
    res.send("Hello, POST!");
});

app.delete('/request', function(req, res) {
    res.send("Hello, DELETE!");
});

app.head('/request', function(req, res) {
    res.send("Hello, HEAD!");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});