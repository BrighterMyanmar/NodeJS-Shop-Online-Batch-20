const jwt = require('jsonwebtoken');

module.exports = {
   validateBody: schema => {
      return (req, res, next) => {
         let result = schema.validate(req.body);
         if (result.error) {
            next(new Error(result.error.details[0].message));
         } else {
            next();
         }
      }
   },
   validateParam: (schema, name) => {
      return (req, res, next) => {
         let obj = {};
         obj[`${name}`] = req.params[`${name}`];
         let result = schema.validate(obj);
         if (result.error) {
            next(new Error(result.error.details[0].message));
         } else {
            next();
         }
      }
   },
   validateToken: () => {
      return (req, res, next) => {
         if (req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            let tokenUser = jwt.verify(token, process.env.SECRET_KEY);
            req.body.user = tokenUser.data;
            next();
         } else next(new Error("Token မပါဘူး ဖြစ်နေတယ်"));
      }
   }
}