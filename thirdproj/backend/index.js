const express = require('express')
const connectToMongo = require('./db');

connectToMongo();
const app = express()
const port = 2500

app.use(express.json());

//Avaiable Routes 
app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})