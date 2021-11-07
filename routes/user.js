const router = require('express-promise-router')();
const controller = require('../controllers/user');
const { validateBody } = require('../utils/validator');
const { UserSchema } = require('../utils/Schema');

router.post("/add/role",[validateBody(UserSchema.addRole),controller.userAddRole]);
router.post("/remove/role",[validateBody(UserSchema.addRole),controller.userRemoveRole]);
router.post("/add/permit",[validateBody(UserSchema.addPermit),controller.userAddPermit]);
router.post("/remove/permit",[validateBody(UserSchema.addPermit),controller.userRemovePermit]);

module.exports = router;

