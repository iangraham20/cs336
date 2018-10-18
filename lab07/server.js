/* server.js is the server for lab07's jQuery, jQuery-UI, & AJAX projects
 * 
 * Class: CS336 with Prof. Vander Linden
 * Author: Ian Christensen
 * Date: Fall, 2018
 */

const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static(__dirname + '/public'));
app.get("/hello", (req, res) => res.send(`Hello, ${req.query.name}!`));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/lab07.html'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));