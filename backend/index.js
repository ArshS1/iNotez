const connection = require("./db");
const express = require("express");
const cors = require("cors"); 

// init database connection
connection();

const app = express();

// looked up for cors req
app.use(cors()); 

const port = 2000;

// setup middleware tp get result in json format
app.use(express.json());

// routes avaliable for application
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/notes', require('./routes/notes')); 


app.listen(port, () => {
  console.log(`iNotez backend at ${port}`);
});
 