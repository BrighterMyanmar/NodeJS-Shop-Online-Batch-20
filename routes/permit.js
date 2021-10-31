const router = require('express-promise-router')();
const controller = require('../controllers/permit');
const { PermitSchema } = require('../utils/Schema');
const { validateBody } = require('../utils/validator');


router.post('/', [validateBody(PermitSchema.add), controller.add])
router.get('/', controller.all)

router.route('/:id')
   .get(controller.get)
   .patch(controller.patch)
   .delete(controller.drop)

module.exports = router;