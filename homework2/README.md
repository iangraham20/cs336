POST COMMAND:
curl -X POST localhost:3000/people -d '{"firstName":"test first","lastName":"test second","loginId":"testID","startDate":"0000-00-00"}' -H 'Content-Type: application/json'

DELETE COMMAND:
curl -X DELETE localhost:3000/person/:id -H 'Content-Type: application/json'

PUT COMMAND:
curl -X PUT localhost:3000/person/testID -d '{"firstName":"update first","lastName":"update second","loginId":"updatedID","startDate":"1111-11-11"}' -H 'Content-Type: application/json'
