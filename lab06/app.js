/* app.js: implements basic HTTP routing methods 
 * Author: Ian Christensen
 * Date: Fall,2018
 */

// Importing necessary libraries and asigning const vars
const bodyParser = require('body-parser');	// Imports body-parser for parsing JSON, buffer, string and URL encoded data using POST
const express = require('express');			// Imports express
const app = express();						// Initilizes an express application
const port = 3000;							// Initilizes the port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

const writeResponseWithBody = (req, res, method) => {
  res.status(200);
  res.send(`Hello ${method} - ${JSON.stringify(req.body)}`);
}

const writeResponse = (req, res, method) => {
  res.status(200);
  res.send(`Hello ${method}`);
}

app.post('/forms', (req, res) => writeResponseWithBody(req, res, 'POST'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));