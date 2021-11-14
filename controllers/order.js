const TB = require("../models/order");
const OderItemTB = require('../models/orderitem');
const ProductTB = require('../models/product');
const Libby = require('../utils/libby');

let add = async (req, res, next) => {

   let order = new TB();
   let items = req.body.items;
   let authUser = req.body.user;

   let insertItems = [];

   for await (let item of items) {
      let product = await ProductTB.findById(item.id);
      insertItems.push({
         order: order._id,
         count: item.count,
         productId: product._id,
         price: product.price,
         name: product.name,
         images: product.images
      });
   }

   let itemResults = await OderItemTB.insertMany(insertItems);

   let itemIds = [];
   itemResults.map(item => itemIds.push(item._id));

   let total = insertItems.reduce((a, b) => a + b.count * b.price, 0);
   order.user = authUser._id;
   order.count = items.length;
   order.total = total;
   order.items = itemIds;
   let result = await order.save();
   Libby.fMsg(res, "Order Accepted", result);
}

let getOrder = async (req, res, next) => {
   let authUser = req.body.user;
   let result = await TB.find({ user: authUser._id }).populate('items');
   Libby.fMsg(res, "Your Orders", result);
}

module.exports = {
   add,
   getOrder
}