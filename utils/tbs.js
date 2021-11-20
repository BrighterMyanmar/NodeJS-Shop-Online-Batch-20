const DB = {
   CategoryDB: require('../models/category'),
   SubCatDB: require('../models/subcat'),
   ChildCatDB: require('../models/childcat'),
   TagDB: require('../models/tag'),
   ProductDB: require('../models/product'),
   OrderDB: require('../models/order'),
   OrderItemDB: require('../models/orderitem'),
   UserDB: require('../models/user'),
   RoleDB: require('../models/role'),
   PermitDB: require('../models/permit')
}
module.exports = DB;