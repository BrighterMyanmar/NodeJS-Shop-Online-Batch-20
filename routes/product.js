const router = require('express-promise-router')();
const controller = require('../controllers/product');
const { validateBody } = require('../utils/validator');
const { ProductSchema } = require('../utils/Schema');

router.post('/', [validateBody(ProductSchema.add), controller.add]);

module.exports = router;