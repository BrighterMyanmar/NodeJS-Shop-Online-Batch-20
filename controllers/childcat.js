const TB = require('../models/childcat');
const SubcatTB = require('../models/subcat');
const LIBBY = require('../utils/libby');

let add = async (req, res, next) => {
   // let saveData = new TB(req.body);
   // let result = await saveDate.save();
   let result = await new TB(req.body).save();
   await SubcatTB.findByIdAndUpdate(req.body.subcat, { $push: { childcats: result._id } });
   LIBBY.fMsg(res, "Child Category Created", result);
}

let all = async (req, res, next) => {
   // let result = await TB.find().select('name -_id');
   let result = await TB.find();
   LIBBY.fMsg(res, "All Child Category", result);
}

let get = async (req, res, next) => {
   let result = await TB.findById(req.params.id);
   LIBBY.fMsg(res, "Single Child Category", result);
}

let patch = async (req, res, next) => {
   let dbChildcat = await TB.findById(req.params.id);
   if (dbChildcat) {
      await TB.findByIdAndUpdate(dbChildcat._id, req.body);
      let result = await TB.findById(dbChildcat._id);
      LIBBY.fMsg(res, "Child Category Updated", result);
   } else next(new Error(`No such child category with id of ${req.params.id}`))
}

let drop = async (req, res, next) => {
   let dbCC = await TB.findById(req.params.id);
   if (dbCC) {
      await SubcatTB.findByIdAndUpdate(dbCC._id, { $pull: { childcats: dbCC._id } });
      await TB.findByIdAndDelete(dbCC._id);
      LIBBY.fMsg(res, "Child Cat Deleted!");
   } else next(new Error(`No such child category with id of ${req.params.id}`))
}

module.exports = {
   add,
   all,
   get,
   patch,
   drop
}