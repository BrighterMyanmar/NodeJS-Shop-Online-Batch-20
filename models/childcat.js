const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChildCatSchema = new Schema({
   subcat: { type: Schema.Types.ObjectId, required: true, ref: "subcat" },
   name: { type: String, required: true, unique: true },
   image: { type: String, required: true },
   created: { type: Date, default: Date.now }
});

const ChildCat = mongoose.model('childcat', ChildCatSchema);

module.exports = ChildCat;