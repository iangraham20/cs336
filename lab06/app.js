/* app.js: implements basic HTTP routing methods 
 * Author: Ian Christensen
 * Date: Fall,2018
 */

// Importing necessary libraries and asigning const vars
const bodyParser = require('body-parser');	// Imports body-parser for parsing JSON, buffer, string and URL encoded data using POST
const express = require('express');			// Imports express
const app = express();						// Initilizes an express application
const port = 3000;							// Initilizes the port number

//
app.use(bodyParser.urlencoded({ extended: true }));	 //
app.use(bodyParser.json());							 //
app.use('/', express.static(__dirname + '/public')); //

/* Subroutine: 
 * Parameters:
 * Precondition:
 * Postcondition:
 */
const writeResponseWithBody = (req, res, method) => {
  res.status(200);
  res.send(`Hello ${method} - ${JSON.stringify(req.body)}`);
}

/* Subroutine: 
 * Parameters:
 * Precondition:
 * Postcondition:
 */
const writeResponse = (req, res, method) => {
  res.status(200);
  res.send(`Hello ${method}`);
}

//
app.get('/request', (req, res) => writeResponse(req, res, 'GET'))			//
.post('/request', (req, res) => writeResponseWithBody(req, res, 'POST'))	//
.put('/request', (req, res) => writeResponseWithBody(req, res, 'PUT'))		//
.delete('/request', (req, res) => writeResponse(req, res, 'DELETE'))		//
.head('/request', (req, res) => writeResponse(req, res, 'HEAD'))			//
.all('/request', (req, res) => res.sendStatus(501));						//

//
app.post('/forms', (req, res) => writeResponseWithBody(req, res, 'POST'));

//
app.listen(port, () => console.log(`Example app listening on port ${port}!`));