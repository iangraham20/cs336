/* Ian Christensen
 * CS336 - lab06
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

app.get('/request', (req, res) => writeResponse(req, res, 'GET'))
.post('/request', (req, res) => writeResponseWithBody(req, res, 'POST'))
.put('/request', (req, res) => writeResponseWithBody(req, res, 'PUT'))
.delete('/request', (req, res) => writeResponse(req, res, 'DELETE'))
.head('/request', (req, res) => writeResponse(req, res, 'HEAD'))
.all('/request', (req, res) => res.sendStatus(501));

app.post('/forms', (req, res) => writeResponseWithBody(req, res, 'POST'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));