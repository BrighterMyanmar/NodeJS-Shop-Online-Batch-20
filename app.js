require('dotenv').config();
const express = require('express'),
   bodyParser = require('body-parser'),
   app = express(),
   fileUpload = require('express-fileupload'),
   mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
app.use(fileUpload());
app.use(bodyParser.json());

const categoryRoute = require('./routes/category');

app.use('/cats', categoryRoute);

app.use((err, req, res, next) => {
   err.status = err.status || 404;
   res.status(err.status).json({ con: false, "msg": err.message });
});

app.get("*", (req, res) => {
   res.status(200).send({ con: false, "msg": "No route with that request!" });
});

app.listen(process.env.PORT, () => console.log(`We are running at port ${process.env.PORT}`));

