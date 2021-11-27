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
}

let incommingMessage = async (io, socket, message) => {
   let msg = await new MessageDB(message).save();
   let msgResult = await MessageDB.findById(msg._id).populate('from to');

   let toUser = await Redis.getObj(message.to);

   if (toUser) {
      let toSocket = io.of("/chat").connected;
      console.log(toSocket);
      // if (toSocket) {
      //    toSocket.emit('message', msgResult);
      // }
   } else {
      await new UnreadDB({ from: message.from, to: message.to }).save();
   }

}

let sendUnreadMsg = async (socket) => {
   let unreads = await UnreadDB.find({ to: socket.currentUserId });
   if (unreads.length > 0) {
      for (let unread of unreads) {
         await UnreadDB.findByIdAndDelete(unrad._id);
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