const Joi = require('joi');

module.exports = {
   UserSchema: {
      register: Joi.object({
         name: Joi.string().min(3).required(),
         phone: Joi.string().min(7).max(11).required(),
         password: Joi.string().min(8).max(30).required()
      })
   },
   CategorySchema: {
      add: Joi.object({
         name: Joi.string().min(3).required(),
         image: Joi.string().required()
      }),
   },
   PermitSchema: {
      add: Joi.object({
         name: Joi.string().min(3).required()
      })
   },
   TagSchema: {
      add: Joi.object({
         name: Joi.string().required(),
         image: Joi.string().required()
      }),
   },
   AllSchema: {
      id: Joi.object({
         id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      })
   }
}



