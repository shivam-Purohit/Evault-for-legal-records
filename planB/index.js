"use strict";
//express server
const express = require("express");
const app = express();

require('dotenv').config();
app.use(express.json());

//middleware for receiving the formdata 
app.use(express.urlencoded({ extended: true }));

//cros origin policy middleware
const cors = require("cors");
app.use(cors());




const {initialize} = require("./utils/utils.js")

const clientRouter = require("./routes/client.js")
const adminRouter = require("./routes/admin.js")
const authRouter = require("./routes/auth.js")
const attorneyRouter = require("./routes/attorney.js")

app.use("/admin", adminRouter)
app.use("/client", clientRouter)
app.use("/attorney", attorneyRouter)
app.use("/", authRouter)

app.listen(8002, async() => {
  
  console.log("Server is running on port 8002");
});





