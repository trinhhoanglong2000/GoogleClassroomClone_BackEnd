const express = require("express");
const router = express.Router();
const passport = require("../../authentication/index.js");
const registerController = require("./registerController");

/* GET users listing. */
//router.get('/', classController.getAllClasses);
router.post(
  "/",
  function (req, res, next) {
    passport.authenticate(
      "register",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401);
          res.send({message:info.message,success:false});
          return;
        }
        
        registerController.Register(user,res)
      }
    )(req, res, next);
  },
  
);

module.exports = router;
