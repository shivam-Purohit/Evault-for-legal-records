const express = require('express')

const adminRouter = express.Router();

const {handleGetAdmin, handleAdminPost} = require("../controllers/admin.js")


adminRouter.get("/:id", handleGetAdmin)

adminRouter.post("/add-case", handleAdminPost)

module.exports =adminRouter

