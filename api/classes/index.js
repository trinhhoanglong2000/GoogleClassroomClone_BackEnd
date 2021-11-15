const express = require("express");
const router = express.Router();
const classController = require("./classController");
const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
const passport = require("../../authentication/index");
/* GET users listing. */
//router.get('/', classController.getAllClasses);

router.get("/", function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    function (err, user, info) {
      
      if (err) {
        return next(err);
      }
      if (!user) {
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.status(401);
        res.send({ message: info.message, success: false });
        return;
      }
      classController.getAllClasses(user, res);
    }
  )(req, res, next);
});
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  classController.detail
);

router.post(
  "/addClass", function (req, res, next) {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      function (err, user, info) {
        
        if (err) {
          return next(err);
        }
        if (!user) {
          res.header({ "Access-Control-Allow-Origin": "*" });
          res.status(401);
          res.send({ message: info.message, success: false });
          return;
        }
        
        classController.addClass({...req.body,userid:user.id}, res)

      }
    )(req, res, next);
  }
);

router.post(
  "/addAccount",
  passport.authenticate("jwt", { session: false }),
  classController.addClassesAccount
);

module.exports = router;
