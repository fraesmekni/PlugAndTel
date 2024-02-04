const express = require("express");
const env = require('dotenv').config()
const mongoose = require("mongoose");
const mongodb = require ('./Config/database.js')
const taskRoutes = require('./routes/TacheRoute.js')
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.port 


const http = require("http")

//connect database
mongodb() 

const app = express();
app.use(bodyParser.json());
var server = http.createServer(app)
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET ,POST ,PUT ,DELETE",
    credentials : true  ,
    exposedHeaders:"Authorization"
  }
  
  ));
app.use('/api/tasks', taskRoutes);
server.listen(port , ()=> console.log(`SERVER CONNECTED ${port}`))