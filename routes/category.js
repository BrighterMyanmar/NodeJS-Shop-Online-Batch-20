const router = require('express-promise-router')();
const controller = require('../controllers/category');
const { saveFile } = require('../utils/gallery');

router.post('/', saveFile, controller.add);

router.route("/:id")
   .get(controller.get)
   .patch(saveFile, controller.patch)
   .delete(controller.drop)

module.exports = router;