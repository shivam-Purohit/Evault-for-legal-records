const express = require('express')

const attorneyRouter = express.Router();
 

const {handleGetAttorney} = require("../controllers/attorney.js")



attorneyRouter.get("/:id", handleGetAttorney)


module.exports =attorneyRouter

