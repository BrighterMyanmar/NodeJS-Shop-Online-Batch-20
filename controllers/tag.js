const TB = require('../models/tag');
const LIBBY = require('../utils/libby');

let add = async (req, res) => {
   let data = new TB(req.body);
   let result = await data.save();
   LIBBY.fMsg(res, "Tag Saved", result);
}
let all = async (req, res) => {
   let result = await TB.find();
   LIBBY.fMsg(res, "All Tags", result);
}
let get = async (req, res) => {
   let result = await TB.findById(req.params.id);
   LIBBY.fMsg(res, "Single Tag", result);
}
let patch = async (req, res) => {
   let existTag = await TB.findById(req.params.id);
   if (existTag) {
      await TB.findByIdAndUpdate(existTag._id, req.body);
      let result = await TB.findById(existTag._id);
      LIBBY.fMsg(res, "Tag Update!", result);
   } else next(new Error("No tag with that id"));
}
let drop = async (req, res, next) => {
   let existTag = await TB.findById(req.params.id);
   if (existTag) {
      await TB.findByIdAndDelete(existTag._id);
      LIBBY.fMsg(res, "Tag Deleted!");
   } else next(new Error("No tag with that id"));
}

module.exports = {
   add,
   all,
   get,
   patch,
   drop,
}
