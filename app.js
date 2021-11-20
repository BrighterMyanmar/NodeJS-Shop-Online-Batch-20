require('dotenv').config();
const express = require('express'),
   bodyParser = require('body-parser'),
   app = express(),
   fileUpload = require('express-fileupload'),
   mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
app.use(fileUpload());
app.use(bodyParser.json());

const categoryRouter = require('./routes/category');
const subcatRouter = require('./routes/subcat');
const childcatRouter = require('./routes/childcat');
const tagRouter = require('./routes/tag');
const permitRouter = require('./routes/permit');
const roleRouter = require('./routes/role');
const userRouter = require('./routes/user');
const apiRouter = require('./routes/api');
const producRouter = require('./routes/product');

let { validateToken } = require('./utils/validator');

app.use('/cats', validateToken(), categoryRouter);
app.use('/subcats', subcatRouter);
app.use('/childcats', childcatRouter);
app.use('/tags', tagRouter);
app.use('/permits', permitRouter);
app.use('/roles', roleRouter);
app.use('/users', validateToken(), userRouter);
app.use('/api', apiRouter);
app.use('/products', validateToken(), producRouter);

app.use((err, req, res, next) => {
   err.status = err.status || 404;
   res.status(err.status).json({ con: false, "msg": err.message });
});

app.get("*", (req, res) => {
   res.status(200).send({ con: false, "msg": "No route with that request!" });
});

let migrate = async () => {
   let migrator = require('./migrations/migrator');
   let generator = require('./migrations/generate');
   // migrator.migrate();
   // await generator.ownerGenerate();
}
// migrate();

app.listen(process.env.PORT, () => console.log(`We are running at port ${process.env.PORT}`));

