Command for installing status codes:
npm install http-status-codes --save


curl commands:
    curl [--head] URL
        GET the specified URL; the head option gets only the header. 
    curl -X method URL -d data -H 'Content-Type: application/json'
        Send the specified HTTP method/data to the specified URL. Here, the data is declared to be in JSON format, e.g., '{"arg":"value"}'.
        You can use the NPM body-parser to parse JSON data on the server side; see the sample code for an example of how to do this. 

GET: curl http://localhost:3000/request
HEAD: curl --head http://localhost:3000/request

GET: curl -X GET http://localhost:3000/request -d data -H 'Content-Type: application'
PUT:
POST:
DELETE:

https://gist.github.com/subfuzion/08c5d85437d5d4f00e58