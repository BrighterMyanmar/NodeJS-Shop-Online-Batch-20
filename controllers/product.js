const TB = require('../models/product');
const LIBBY = require('../utils/libby');

let add = async (req, res, next) => {
   LIBBY.fMsg(res, "New Product", req.body);
}

module.exports = {
   add
}