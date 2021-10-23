const TB = require('../models/subcat');
const CategoryTB = require('../models/category');
const LIBBY = require('../utils/libby');

let add = async (req, res, next) => {
   let saveData = new TB(req.body);
   let result = await saveData.save();

   let category = await CategoryTB.findById(req.body.category);
   let catUpdate = await CategoryTB.findByIdAndUpdate(category._id, { $push: { subcats: result._id } })

   LIBBY.fMsg(res, "Sub Category Saved!", result);
}

let all = async (req, res, next) => {
   let result = await TB.find().populate('category');
   LIBBY.fMsg(res, "All Sub Categories", result);
}

let patch = async (req, res, next) => {
   await TB.findByIdAndUpdate(req.params.id, req.body);
   let result = await TB.findById(req.params.id);
   LIBBY.fMsg(res, "Sub Category Updated", result);
}

let get = async (req, res, next) => {
   let result = await TB.findById(req.params.id);
   if (result) {
      LIBBY.fMsg(res, "Single Category", result);
   } else next(new Error(`No Sub Category with that id of ${req.params.id}`));
}

let drop = async (req, res, next) => {
   let subcat = await TB.findById(req.params.id);
   if (subcat) {
      await CategoryTB.findByIdAndUpdate(subcat.category, { $pull: { subcats: subcat._id } });
      let result = await TB.findByIdAndDelete(req.params.id);
      LIBBY.fMsg(res, "Sub Category Deleted!", subcat);
   } else next(new Error(`No Sub Category with that id of ${req.parmas.id}`));
}

module.exports = {
   add,
   all,
   patch,
   get,
   drop
}