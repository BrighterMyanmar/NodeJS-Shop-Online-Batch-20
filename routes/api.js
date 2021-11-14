const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const ProductController = require('../controllers/product');
const CategoryController = require('../controllers/category');
const SubCatController = require('../controllers/subcat');
const ChildCatController = require('../controllers/childcat');
const TagController = require('../controllers/tag');
const OrderController = require('../controllers/order');
const { validateBody, validateParam, validateToken } = require('../utils/validator');
const { UserSchema, AllSchema } = require('../utils/Schema');

router.post("/register", [validateBody(UserSchema.register), UserController.register]);
router.post('/login', [validateBody(UserSchema.login), UserController.login]);
router.post('/passreset', [validateToken(), UserController.passwordReset]);

router.post('/order', [validateToken(), OrderController.add]);
router.get('/myorders', [validateToken(), OrderController.getOrder]);

router.get('/products/:page', [validateParam(AllSchema.page, "page"), ProductController.all]);
router.get('/cats', CategoryController.all);
router.get('/subcats', SubCatController.all);
router.get('/childcats', ChildCatController.all);
router.get('/tags', TagController.all);
router.get('/pro/cats/:id', [validateParam(AllSchema.id, "id"), ProductController.catProducts]);
router.get('/pro/subcats/:id', [validateParam(AllSchema.id, "id"), ProductController.subcatProducts]);
router.get('/pro/childcats/:id', [validateParam(AllSchema.id, "id"), ProductController.childCatProducts]);
module.exports = router;

