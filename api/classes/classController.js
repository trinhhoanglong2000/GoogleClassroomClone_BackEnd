const poolean = require('../../Database/index.js')
const { v4: uuidv4 } = require('uuid');

const classService = require("./classService");

exports.getAllClasses = async (req, res) => {
  try {
    
    const allData = await poolean.query("SELECT * FROM \"Classes\"")
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json(allData.rows);
    
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: 'No class available'
    })
  }
}
exports.detail = async function (req, res) {
  const id = req.params.id.toString();
  try {
    const classItem = await poolean.query(`
  SELECT * 
  FROM \"Classes\"
  WHERE id = $1
  `,[id])
  res.status(200).json(classItem.rows);
  } catch (err) {
    res.status(404).json({
      message: 'The class with given ID was not found'
    })
  }
}

exports.addClass = async function (req, res) {
  const classInfo = req.body;
  console.log(classInfo)
  console.log(uuidv4())
  try {
    const classItem = await poolean.query(`
    INSERT INTO \"Classes\" (id, name, section, subject, room)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,[classInfo.id,classInfo.name,classInfo.section,classInfo.subject,classInfo.room])
  res.status(200).json(classItem.rows);
  } catch (err) {
    res.status(404).json({
      message: 'Recheck your submit information'
    })
  }
  // if (classInfo.className && classInfo.teacherName && classInfo.quantity) {
  //   classService.addClass(classInfo, InsertResuil => {
  //     if (InsertResuil === 200) {
  //       res.header({ "Access-Control-Allow-Origin": "*" });
  //       res.status(InsertResuil).json("Add new class successful!!!")
  //     }
  //     else {
  //       res.header({ "Access-Control-Allow-Origin": "*" });
  //       res.status(404).json("Error")
  //     }

  //   })
  // } else {
  //   res.header({ "Access-Control-Allow-Origin": "*" });
  //   res.status(400).json("Recheck your submit information")
  // }
}

