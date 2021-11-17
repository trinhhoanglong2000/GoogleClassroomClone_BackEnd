
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
    INSERT INTO \"Account\" (id, username, password,img, dob, gender,email,phone,firstname,lastname,fb_id,gg_id,student_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13)
    RETURNING *
    `,[uuidv4(),req.username,req.password,null,req.dob,req.gender,req.username,req.phone,req.firstname,req.lastname,null,null,null])
  res.status(200).json({data:classItem.rows,success:true});
    
  } catch (err) {
    res.status(404).json({
      message: 'Recheck your submit information'
    })
  }
};
