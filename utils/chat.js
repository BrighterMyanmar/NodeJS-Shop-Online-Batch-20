const Redis = require('./redis');
const UnreadDB = require('../models/unread');
const MessageDB = require('../models/message');

let liveUser = async (socketId, user) => {
   user['socketId'] = socketId;
   await Redis.setObj(socketId, user._id);
   await Redis.setObj(user._id, user);
}

let initialize = async (io, socket) => {
   socket["currentUserId"] = socket.userData._id;
   await liveUser(socket.id, socket.userData);

   socket.on('unread', data => sendUnreadMsg(socket));
   socket.on('message', data => incommingMessage(io, socket, data));
   socket.on('load-more', data => loadMore(socket, data));
}

let loadMore = async (socket, data) => {
   let limit = Number(process.env.MSG_LIMIT);
   let skip = data.page == 0 ? 0 : Number(data.page) * limit;
   let messages = await MessageDB.find({
      $or: [{ from: socket.currentUserId }, { to: socket.currentUserId }]
   }).sort({ created: -1 }).skip(skip).limit(limit).populate('from to', 'name _id');
   socket.emit('messages', messages);
}

let incommingMessage = async (io, socket, message) => {
   let msg = await new MessageDB(message).save();
   let msgResult = await MessageDB.findById(msg._id).populate('from to');

   let toUser = await Redis.getObj(message.to);

   if (toUser) {
      // let toSocket = io.of("/chat").connected[toUser.socketId]; // V4
      let toSocket = io.of('/chat').sockets.get(toUser.socketId);  // V2
      if (toSocket) {
         console.log("User is online");
         toSocket.emit('message', msgResult);
      } else {
         console.log("User is offline");
         await new UnreadDB({ from: message.from, to: message.to }).save();
      }
   } else {
      await new UnreadDB({ from: message.from, to: message.to }).save();
   }
}

let sendUnreadMsg = async (socket) => {
   let unreads = await UnreadDB.find({ to: socket.currentUserId });
   console.log(unreads.length);
   if (unreads.length > 0) {
      for (let unread of unreads) {
         await UnreadDB.findByIdAndDelete(unread._id);
      }
   }
   socket.emit('unread', { msg: unreads.length });
}

module.exports = {
   initialize
};

// reciever => online/offline
// if reciever offline => message , unread 
// if receiver online => message