const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCatSchema = new Schema({
   category: { type: Schema.Types.ObjectId, required: true, ref: "category" },
   name: { type: String, required: true, unique: true },
   image: { type: String, required: true },
   childcats: [{ type: Schema.Types.ObjectId, ref: "childcat" }],
   created: { type: Date, default: Date.now }
});

const SubCat = mongoose.model("subcat", SubCatSchema);

module.exports = SubCat;