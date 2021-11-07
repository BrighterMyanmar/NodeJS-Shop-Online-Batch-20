const router = require('express-promise-router')();
const controller = require('../controllers/user');
const { validateBody } = require('../utils/validator');
const { UserSchema } = require('../utils/Schema');

router.post("/register", [validateBody(UserSchema.register), controller.register]);
router.post('/login', [validateBody(UserSchema.login), controller.login]);

module.exports = router;

