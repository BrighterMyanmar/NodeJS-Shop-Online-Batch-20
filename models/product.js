const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
   name: { type: String, required: true, unique: true },
   price: { type: Number, required: true },
   breand: { type: String, required: true },
   category: { type: Schema.Types.ObjectId, ref: "category" },
   subcat: { type: Schema.Types.ObjectId, ref: "subcat" },
   childcat: { type: Schema.Types.ObjectId, ref: "childcat" },
   tag: { type: Schema.Types.ObjectId, ref: "tag" },
   refund: { type: String, enum: ["YES", "NO", "IN_10_DAYS"], default: "NO" },
   features: { type: Object, required: true },
   colors: { type: Array, required: true },
   images: { type: Array, required: true },
   created: { type: Date, default: Date.now }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;