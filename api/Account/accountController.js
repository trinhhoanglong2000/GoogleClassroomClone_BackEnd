const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
const validation = require("../../authentication/validation");

exports.getAccount = async (req, res) => {
  try {
    const data = await poolean.query(
      'SELECT * FROM "Account" WHERE "Account".id=$1 ',
      [req.id]
    );
    delete data.rows[0]["password"];

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      success: false,
      message: "No class available",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    //Check valid
   
    const { error } = await validation.UpdateValidation(req);
    if (error) {
      res.header({ "Access-Control-Allow-Origin": "*" });
      res.status(404).json({
        success: false,
        message: error.details[0].message ,
      });
      return
    }
    const data = await poolean.query(
      `UPDATE "Account" 
      SET password=$1, firstname=$2, lastname=$3, dob=$4, student_id = $6
      WHERE id=$5 `,
      [req.password,req.firstname,req.lastname,req.dob,req.userid,req.student_id]
    );

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(201).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      success: false,
      message: "No class available",
    });
  }
};
