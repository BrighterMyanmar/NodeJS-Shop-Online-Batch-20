require('dotenv').config();
const express = require('express'),
   bodyParser = require('body-parser'),
   app = express(),
   fileUpload = require('express-fileupload'),
   { deleteFile } = require("./utils/gallery");

// mongodb => noSQL database => SQL

app.use(fileUpload());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
   err.status = err.status || 404;
   res.status(err.status).json({ con: false, "msg": err.message });
});

app.get("*", (req, res) => {
   res.status(200).send({ con: false, "msg": "No route with that request!" });
});

app.listen(process.env.PORT, () => console.log(`We are running at port ${process.env.PORT}`));