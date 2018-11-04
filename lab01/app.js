/* app.js is the simplest Express app you can create
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */
 
// enforce strict syntax rules
"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/doc.html'));
app.listen(port, () => console.log(`lab 1 is listening on port ${port}!`));
