require("dotenv").config();
const express = require('express')

const config = require("./app.config");

const app = express()
const port = config.PORT

console.log(config.NODE_ENV);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))