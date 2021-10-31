const TB = require('../models/permit');
const LIBBY = require('../utils/libby');

let add = async (req, res, next) => {
   let existPermit = await TB.findOne({ name: req.body.name });
   if (!existPermit) {
      let data = new TB(req.body);
      let result = await data.save();
      LIBBY.fMsg(res, "Permission Saved!", result);
   } else next(new Error("Permission Already Exist!"));

}
let all = async (req, res, next) => {
   let result = await TB.find();
   LIBBY.fMsg(res, "All Permissions", result);
}
let get = async (req, res, next) => {
   let result = await TB.findById(req.params.id);
   LIBBY.fMsg(res, "Single Permission", result);
}
let patch = async (req, res, next) => {
   let existPermit = await TB.findById(req.params.id);
   if (existPermit) {
      await TB.findByIdAndUpdate(req.params.id, req.body);
      let result = await TB.findById(req.params.id);
      LIBBY.fMsg(res, "Single Permission", result);
   } else next(new Error("No permission with that id"));
}
let drop = async (req, res, next) => {
   let existPermit = await TB.findById(req.params.id);
   if (existPermit) {
      let result = await TB.findByIdAndDelete(req.params.id);
      LIBBY.fMsg(res, "Permission Deleted", result);
   } else next(new Error("No permission with that id"));
}

module.exports = {
   add,
   all,
   get,
   patch,
   drop,
}
