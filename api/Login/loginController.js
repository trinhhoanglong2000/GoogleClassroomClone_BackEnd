const jwt = require("jsonwebtoken");
const poolean = require("../../Database/index.js");
exports.getUserName = async (username) => {
  try {
    const classItem = await poolean.query(`
  SELECT * 
  FROM \"Account\"
  WHERE username = $1
  `,[username])
    return classItem
  } catch (err) {
    return null;
  }
};
exports.Login = (req, res) => {
  
  res.json({
    success: true,
    id:req.id,
    user: req.username,
    token: jwt.sign(
      {
        id:req.id,
        username: req.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    ),
  });
};
