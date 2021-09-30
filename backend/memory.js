
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const visitor = require('./routes/visitor')
require("./config/configDB.js");
require('dotenv').config()

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))
app.use(helmet({
    contentSecurityPolicy: false,
}))

app.use(('/', visitor))

app.listen(process.env.PORT || 8080)
console.log('listening on ' + process.env.PORT || 8080)