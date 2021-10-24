const Joi = require('joi');

module.exports = {
   CategorySchema: {
      add: Joi.object({
         name: Joi.string().min(3).required(),
         image: Joi.string().required()
      }),
   },
   AllSchema: {
      id: Joi.object({
         id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      })
   }
}



