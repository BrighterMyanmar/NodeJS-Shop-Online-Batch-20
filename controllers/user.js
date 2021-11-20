const TB = require('../models/user');
const LIBBY = require('../utils/libby');

let register = async (req, res, next) => {
   let phonExistUser = await TB.findOne({ phone: req.body.phone });
   if (!phonExistUser) {
      req.body.password = LIBBY.encode(req.body.password);
      let result = await new TB(req.body).save();
      LIBBY.fMsg(res, 'Register Success');
   } else next(new Error("Phone Number is already in use!"));
}

let login = async (req, res, next) => {
   let dbUser = await TB.findOne({ "phone": req.body.phone }).populate('roles permits');
   if (dbUser) {
      if (LIBBY.comPass(req.body.password, dbUser.password)) {
         let userObj = dbUser.toObject();
         delete userObj.password;
         userObj.token = LIBBY.genToken(userObj);
         LIBBY.fMsg(res, "Login Success", userObj);
      } else next(new Error("Password Error!"));
   } else next(new Error("No User with that phone!"));
}

let userAddRole = async (req, res, next) => {
   let dbUser = await TB.findById(req.body.userId);

   let found = dbUser.roles.find(rid => rid.equals(req.body.roleId));

   if (found) {
      next(new Error("Role is already exist!"));
   } else {
      await TB.findByIdAndUpdate(req.body.userId, { $push: { roles: req.body.roleId } });
      let result = await TB.findById(req.body.userId);
      LIBBY.fMsg(res, "Role Added to User", found);
   }
}

let userRemoveRole = async (req, res, next) => {
   let dbUser = await TB.findById(req.body.userId);
   if (dbUser) {
      let found = dbUser.roles.find(rid => rid.equals(req.body.roleId));
      if (found) {
         await TB.findByIdAndUpdate(req.body.userId, { $pull: { roles: req.body.roleId } });
         let result = await TB.findById(req.body.userId).populate("roles");
         LIBBY.fMsg(res, "User", result);
      } else next(new Error(`user has no role with that id of ${req.body.roleId}`))
   } else next(new Error(`No user with that id of ${req.body.userId}`))
}

let userAddPermit = async (req, res, next) => {
   let dbUser = await TB.findById(req.body.userId);
   if (dbUser) {
      let found = dbUser.permits.find(pid => pid.equals(req.body.permitId));
      if (!found) {
         await TB.findByIdAndUpdate(req.body.userId, { $push: { permits: req.body.permitId } });
         LIBBY.fMsg(res, "Permit Added");
      } else next(new Error("User have that permit already!"));
   } else next(new Error(`No user with that id of ${req.body.userId}`));
}

let userRemovePermit = async (req, res, next) => {
   let dbUser = await TB.findById(req.body.userId);
   let found = dbUser.permits.find(pid => pid.equals(req.body.permitId));
   if (found) {
      await TB.findByIdAndUpdate(req.body.userId, { $pull: { permits: req.body.permitId } });
      LIBBY.fMsg(res, "User Permit Removed");
   } else next(new Error(`User doesn't has that permit id of ${req.body.userId}`));
}

let passwordReset = async (req, res, next) => {
   let user = await TB.findById(req.body.user._id);
   if (LIBBY.comPass(req.body.oldpass, user.password)) {
      let encodePass = LIBBY.encode(req.body.newpass);
      await TB.findByIdAndUpdate(user._id, { password: encodePass });
      LIBBY.fMsg(res, "Password Reset");
   } else next(new Error(`Creditial Error`));
}
module.exports = {
   register,
   login,
   userAddRole,
   userRemoveRole,
   userAddPermit,
   userRemovePermit,
   passwordReset
}