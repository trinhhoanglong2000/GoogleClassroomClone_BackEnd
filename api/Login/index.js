const express = require("express");
const router = express.Router();
const passport = require("../../authentication/index.js");
const loginController = require("./loginController");

/* GET users listing. */
//router.get('/', classController.getAllClasses);
router.post(
  "/",
  function (req, res, next) {
    passport.authenticate(
      "local",
      {
        session: false,
      },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401);
          res.end(info.message);
          return;
        }
        
        loginController.Login(user,res)
      }
    )(req, res, next);
  },
  
);

module.exports = router;
