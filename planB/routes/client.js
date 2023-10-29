const express = require('express')
const multer = require('multer');


const clientRouter = express.Router();
const upload = multer({ dest: 'uploads/' })

const {handleGetClient, handlePostClient} = require("../controllers/client.js")


clientRouter.get("/:id", handleGetClient)

clientRouter.post("/upload", upload.single('file'), handlePostClient)
module.exports = clientRouter
