const express = require("express");
const router = express.Router();
const classesaccountController = require("./classesaccountController");
const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
const passport = require("../../authentication/index");
router.get("/:id", function (req, res, next) {
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
        classesaccountController.GetAllAccount(req, res,user);
      }
    )(req, res, next);
  });


  module.exports = router;