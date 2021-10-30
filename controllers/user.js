const TB = require('../models/user');
const LIBBY = require('../utils/libby');

let register = async (req, res, next) => {
   LIBBY.fMsg(res, 'Register Success', req.body);
}

module.exports = {
   register
}