const poolean = require("../../Database/index.js");

exports.GetAllAccount = async (req, res, user) => {
  
  const id = req.params.id;
 
  //Validate if the user is exist in the class

  
  try {
    const type = await poolean.query(
      'SELECT * FROM classesaccount where (classesaccount.classid=$1 AND classesaccount.accountid=$2 ) ',
      [id,user.id]
    );
    //
    const data = await poolean.query(
      'SELECT * FROM ("Account" INNER JOIN classesaccount ON (classesaccount.classid=$1 AND "Account".id=classesaccount.accountid)) ',
      [id]
    );
    if (type.rows.length==0){
        //this account not belong to this class
        res.status(404).json({
          message: "No class available",
          success:false
        });
        return

    }
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No class available",
      success:false
    });
  }
};
