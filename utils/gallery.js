const fs = require("fs");

let saveFile = (req, res, next) => {
   let fileName = new Date().valueOf() + "_" + req.files.file.name;
   req.files.file.mv(`./uploads/${fileName}`);
   req.body["image"] = fileName;
   next();
}
let saveFiles = (req, res, next) => {
   let filenames = [];
   req.files.files.forEach(file => {
      let fileName = new Date().valueOf() + "_" + file.name;
      filenames.push(fileName);
      file.mv(`./uploads/${fileName}`);
   });
   req.body["images"] = filenames;
   next();
}

let deleteFile = async (name) => {
   await fs.unlinkSync(`./uploads/${name}`);
}
module.exports = {
   saveFile,
   saveFiles,
   deleteFile
}