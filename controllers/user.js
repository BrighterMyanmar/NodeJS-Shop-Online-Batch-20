const TB = require('../models/user');
const LIBBY = require('../utils/libby');

let register = async (req, res, next) => {
   req.body.password = LIBBY.encode(req.body.password);
   let result = await new TB(req.body).save();
   LIBBY.fMsg(res, 'Register Success', result);
}

module.exports = {
   register
}