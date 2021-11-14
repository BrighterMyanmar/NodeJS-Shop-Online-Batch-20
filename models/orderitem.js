const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
   order: { type: Schema.Types.ObjectId, required: true, ref: "order" },
   count: { type: Number, required: true },
   productId: { type: Schema.Types.ObjectId, required: true, ref: "product" },
   price: { type: Number, required: true },
   name: { type: String, required: true },
   images: { type: Array },
   discount: { type: Number, default: 0 },
   status: { type: Boolean, default: false },
   create: { type: Date, default: Date.now }
});

const OrderItem = mongoose.model('orderitem', OrderItemSchema);
module.exports = OrderItem;