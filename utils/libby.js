const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let fMsg = (res, msg, result = {}) => {
   res.status(200).json({ con: true, msg, result });
}
let getTokenFromSocket = async (socket, next) => {
   user = 'blank';
   let token = socket.handshake.query.token;
   if (token) {
      try {
         let user = jwt.verify(token, process.env.SECRET_KEY);
         socket.userData = user.data;
         next();
      } catch (error) {
         next(new Error("Hand Shake Error"));
      }
   } else next(new Error("Hand Shake Error"));
}

module.exports = {
   fMsg,
   encode: (payload) => bcrypt.hashSync(payload, 10),
   comPass: (plain, hash) => bcrypt.compareSync(plain, hash),
   genToken: (playload) => jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: playload
   }, process.env.SECRET_KEY),
   getTokenFromSocket
}