// DECLARING MODULES
const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const http = require("http");
const bodyParser = require("body-parser");

//DEFINING MODULES
const app = express();
const port = 3001 || process.env.PORT;
const hostname = "localhost";

//VALIDATING MODULES POLICY
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
env.config();

//STARTING APP
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server Running at http://${hostname}:${port}/`);
});