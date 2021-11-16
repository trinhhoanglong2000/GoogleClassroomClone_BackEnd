const poolean = require("../../Database/index.js");

exports.GetAllAccount = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await poolean.query(
        'SELECT * FROM ("Account" INNER JOIN classesaccount ON (classesaccount.classid=$1 AND "Account".id=classesaccount.accountid)) ',
        [id]
      );
      
  
      res.header({ "Access-Control-Allow-Origin": "*" });
      res.status(200).json({ data: data.rows, success: true });
    } catch (err) {
      res.header({ "Access-Control-Allow-Origin": "*" });
      res.status(404).json({
        message: "No class available",
      });
    }
  };