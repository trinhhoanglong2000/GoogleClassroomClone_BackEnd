const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");
exports.GetAllGrade = async (req, res, user) => {
  //const id = req.params.id;
  //Validate if the user is exist in the class
    
  try {
    
    //
    const data = await poolean.query(`
    SELECT "Classes".name, "Classes".section, "Homework".name as homeworkName, grade.grade, grade.idaccount, grade.idclass,grade.idhomework
    FROM ((grade
    INNER JOIN "Classes" ON "Classes".id = grade.idclass)
    INNER JOIN "Homework" ON "Homework".id = grade.idhomework)
    WHERE grade.idaccount = $1;
    `,[user.id])
        console.log(data.rows)
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No grade available",
      success:false
    });
  }
};
