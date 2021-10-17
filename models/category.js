const mongoose = require('mongoose');
const { Schema } = mongoose;
const CategorySchema = new Schema({
   name: { type: String, unique: true, required: true },
   image: { type: String, required: true },
   created: { type: Date, default: Date.now }
});
const Category = mongoose.model('category', CategorySchema);

module.exports = Category;

