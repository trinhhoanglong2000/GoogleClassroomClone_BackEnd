const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;

const validation = require("../authentication/validation");
const loginController = require("../api/Login/loginController");
const registerController = require("../api/Register/registerController");

//
passport.use(
  "register",
  new CustomStrategy(async function (req, done) {
    //Validate

    const { error } = await validation.registerValidation(req.body);
    if (error) return done(null, false, { message: error.details[0].message });
    // Do your custom user finding logic here, or set to false based on req object
    const data = await registerController.getUserName(req.body.username);

    if (data.rows[0] != undefined) {
      return done(null, false, { message: "Username taken" });
    } else {
      return done(null, req.body);
    }
  })
);

passport.use(
  new LocalStrategy(async function (username, password, done) {
    //Validation the data

    const { error } = await validation.loginValidation({
      username: username,
      password: password,
    });
    if (error) return done(null, false, { message: error.details[0].message });

    //
    const data = await loginController.getUserName(username);

    if (data.rows[0] == undefined) {
      return done(null, false, { message: "Incorrect username." });
    } else {
      if (data.rows[0].password !== password)
        return done(null, false, { message: "Incorrect password." });

      return done(null, { id: data.rows[0].id, username: username });
    }
  })
);
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {

    return done(null, { id: jwt_payload.id, username: jwt_payload.username },{ message: "Failed to get data" });
  })
);
module.exports = passport;
