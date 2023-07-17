const express = require('express');
const cors = require('cors')
const connectToMongo = require('./db');

connectToMongo(); //function imported from db.js to connect with database
const app = express()
app.use(cors())
const port = 2500

app.use(express.json());

//Avaiable Routes 
app.use('/api/auth',require('./routes/auth'))  //auth.js - Create New User and Login
app.use('/api/notes',require('./routes/notes')) //notes.js - All notes access of loggedin used

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port http://localhost:${port}`)
})