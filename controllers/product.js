const TB = require('../models/product');
const LIBBY = require('../utils/libby');

let add = async (req, res, next) => {
   let existProduct = await TB.findOne({ name: req.body.name });
   if (existProduct) {
      next(new Error("Product name is already in use!"));
      return;
   }
   delete req.body.user;
   let result = await new TB(req.body).save();
   LIBBY.fMsg(res, "New Product", result);
}

let all = async (req, res, next) => {
   let page = req.params.page;
   let skipCount = Number(page) == 1 ? 0 : (Number(page) - 1) * process.env.LIMIT;
   let result = await TB.find().skip(skipCount).limit(Number(process.env.LIMIT));
   LIBBY.fMsg(res, "All Products", result);
}

let catProducts = async (req, res, next) => {
   let result = await TB.find({ category: req.params.id });
   LIBBY.fMsg(res, "Category Products", result);
}
let subcatProducts = async (req, res, next) => {
   let result = await TB.find({ subcat: req.params.id });
   LIBBY.fMsg(res, "Subcat Category Products", result);
}
let childCatProducts = async (req, res, next) => {
   let result = await TB.find({ childcat: req.params.id });
   LIBBY.fMsg(res, "Child Category Products", result);
}

module.exports = {
   add,
   all,
   catProducts,
   subcatProducts,
   childCatProducts
}