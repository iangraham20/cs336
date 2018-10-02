const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('CS336 Homework01'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

express.static("./public")
app.use(express.static('public'))