const mongoose = require('mongoose');
const { Schema } = mongoose;
const UnreadSchema = new Schema({
   from: { type: Schema.Types.ObjectId, requird: true },
   to: { type: Schema.Types.ObjectId, requird: true },
});
const Unread = mongoose.model('unread', UnreadSchema);

module.exports = Unread;
