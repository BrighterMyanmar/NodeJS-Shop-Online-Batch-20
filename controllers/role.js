const TB = require('../models/role');
const LIBBY = require('../utils/libby');

let add = async (req, res, next) => {
   let existRole = await TB.findOne({ name: req.body.name });
   if (!existRole) {
      let data = new TB(req.body);
      let result = await data.save();
      LIBBY.fMsg(res, "Role Saved", result);
   } else next(new Error("Role name is already in use"));

}
let all = async (req, res, next) => {
   let result = await TB.find().populate('permits');
   LIBBY.fMsg(res, "All Roles", result);
}
let get = async (req, res, next) => {
   let existRole = await TB.findById(req.params.id);
   if (existRole) {
      LIBBY.fMsg(res, "Single Role", existRole);
   } else next(new Error("Role name is already in use"));
}
let patch = async (req, res, next) => {
   let existRole = await TB.findById(req.params.id);
   if (existRole) {
      await TB.findByIdAndUpdate(req.params.id, req.body);
      let result = await TB.findById(req.params.id);
      LIBBY.fMsg(res, "Role Updated", result);
   } else next(new Error("Role name is already in use"));
}
let drop = async (req, res, next) => {
   let existRole = await TB.findById(req.params.id);
   if (existRole) {
      let result = await TB.findByIdAndDelete(existRole._id);
      LIBBY.fMsg(res, "Role Deleted", result);
   } else next(new Error("Role name is already in use"));
}

let addPermit = async (req, res, next) => {
   let result = await TB.findByIdAndUpdate(req.body.roleId, { $push: { permits: req.body.permitId } });
   LIBBY.fMsg(res, "Permit Added To Role", result);
}
let removePermit = async (req, res, next) => {
   let result = await TB.findByIdAndUpdate(req.body.roleId, { $pull: { permits: req.body.permitId } });
   LIBBY.fMsg(res, "Permit Remove From Role", result);
}
module.exports = {
   add,
   all,
   get,
   patch,
   drop,
   addPermit,
   removePermit
}
