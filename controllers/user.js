const TB = require('../models/user');
const LIBBY = require('../utils/libby');

let register = async (req, res, next) => {
   req.body.password = LIBBY.encode(req.body.password);
   let result = await new TB(req.body).save();
   LIBBY.fMsg(res, 'Register Success', result);
}

let login = async (req, res, next) => {
   let dbUser = await TB.findOne({ "phone": req.body.phone });
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

module.exports = {
   register,
   login,
   userAddRole
}