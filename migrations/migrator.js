const fileUpload = require('express-fileupload');
const fs = require('fs');
const DB = require('../utils/tbs');
const writeFile = async (file, data) => await fs.writeFileSync(file, JSON.stringify(data));
const readFile = async (file) => JSON.parse(await fs.readFileSync(file, 'utf8'));
const storage = (file) => `./migrations/backups/${file}.json`;

const migrator = {
   backup: async (DB, file) => {
      let data = await DB.find();
      await writeFile(storage(file), data);
      console.log(file, "Backuped");
   },
   migrate: async (DB, filename) => {
      let data = await readFile(storage(filename));
      await DB.insertMany(data);
      console.log(filename, " Migrated");
   }
}

let backup = async () => {
   await migrator.backup(DB.CategoryDB, "categories");
   await migrator.backup(DB.SubCatDB, "subcats");
   await migrator.backup(DB.ChildCatDB, "childcats");
   await migrator.backup(DB.TagDB, "tags");
   await migrator.backup(DB.ProductDB, "products");
   await migrator.backup(DB.OrderDB, "orders");
   await migrator.backup(DB.OrderItemDB, "orderitems");
   await migrator.backup(DB.UserDB, "users");
   await migrator.backup(DB.RoleDB, "roles");
   await migrator.backup(DB.PermitDB, "permits");
}

let migrate = async () => {
   await migrator.migrate(DB.CategoryDB, "categories");
   await migrator.migrate(DB.SubCatDB, "subcats");
   await migrator.migrate(DB.ChildCatDB, "childcats");
   await migrator.migrate(DB.TagDB, "tags");
   await migrator.migrate(DB.ProductDB, "products");
   await migrator.migrate(DB.OrderDB, "orders");
   await migrator.migrate(DB.OrderItemDB, "orderitems");
   await migrator.migrate(DB.UserDB, "users");
   await migrator.migrate(DB.RoleDB, "roles");
   await migrator.migrate(DB.PermitDB, "permits");
}


module.exports = {
   migrate,
   backup
}
