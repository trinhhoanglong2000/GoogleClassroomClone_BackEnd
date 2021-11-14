
const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require('uuid');
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


exports.Register = async (req, res) => {
  
  try {
    const classItem = await poolean.query(`
    INSERT INTO \"Account\" (id, username, password,img, dob, gender,email,phone,firstname,lastname)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,[uuidv4(),req.username,req.password,null,req.dob,req.gender,req.username,req.phone,req.firstname,req.lastname])
  res.status(200).json(classItem.rows);
  } catch (err) {
    res.status(404).json({
      message: 'Recheck your submit information'
    })
  }
};
