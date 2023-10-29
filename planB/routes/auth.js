const express = require('express')
const authRouter = express.Router();

const {handleLogin}= require("../controllers/auth.js")


authRouter.post("/login", handleLogin)


module.exports = authRouter;