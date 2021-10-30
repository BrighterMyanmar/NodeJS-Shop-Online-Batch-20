const router = require('express-promise-router')();
const controller = require('../controllers/tag');
const { saveFile } = require('../utils/gallery');
const { TagSchema, AllSchema } = require('../utils/Schema');
const { validateBody, validateParam } = require('../utils/validator');

router.post('/', [saveFile, validateBody(TagSchema.add), controller.add]);
router.get('/', controller.all);


router.route('/:id')
   .get([validateParam(AllSchema.id, "id"), controller.get])
   .patch([saveFile, validateParam(AllSchema.id, "id"), validateBody(TagSchema.add), controller.patch])
   .delete([validateParam(AllSchema.id, "id"), controller.drop])

module.exports = router;