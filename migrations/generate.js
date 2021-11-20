const DB = require('../utils/tbs');
const LIBBY = require('../utils/libby');

let ownerUser = {
   name: "Owner",
   phone: "09100100100",
   password: "123123123",
   roles: ["617e791855c8a25285d8f91c"]
}

let ownerGenerate = async () => {
   ownerUser.password = LIBBY.encode(ownerUser.password);
   let result = await new DB.UserDB(ownerUser).save();
   console.log("Owner Generated", result);
}

module.exports = {
   ownerGenerate
}