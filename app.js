// IMPORTING MODULES
const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const getVideoFromAPI = require('./getVideo');

//IMPORTING ROUTERS
const queryRouter = require('./routers/QueryRouter');

//DEFINING MODULES
const app = express();
const port = 3001 || process.env.PORT;
const hostname = "localhost";

//VALIDATING MODULES POLICY
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
env.config();

app.use('/query', queryRouter);

setInterval(getVideoFromAPI,120000);

//CONNECTING TO MONGODB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection.on('connected',()=>{
    console.log("MongoDB connection established successfully!")
})

mongoose.connection.on('error',(err)=>{
    console.log("Error occured while establishing connection to mongoDB:",err)
})

//STARTING APP
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server Running at http://${hostname}:${port}/`);
});
