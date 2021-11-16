const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
exports.getAccount = async (req, res) => {
  try {
    const data = await poolean.query(
      'SELECT * FROM "Account" WHERE "Account".id=$1 ',
      [req.id]
    );
    delete data.rows[0]['password'];

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No class available",
    });
  }
};
