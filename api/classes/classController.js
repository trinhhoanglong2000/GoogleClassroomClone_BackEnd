const poolean = require("../../Database/index.js");
const { v4: uuidv4 } = require("uuid");

const classService = require("./classService");

exports.getAllClasses = async (req, res) => {
  
  try {
    const data = await poolean.query(
      'SELECT * FROM ("Classes" INNER JOIN classesaccount ON (classesaccount.accountid=$1 AND "Classes".id=classesaccount.classid)) ',
      [req.id]
    );
    // const allData = await poolean.query("SELECT * FROM \"Classes\"")
    // const classData = await poolean.query("SELECT * FROM classesaccount WHERE accountid=$1",[req.id])

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ data: data.rows, success: true });
  } catch (err) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(404).json({
      message: "No class available",
    });
  }
};
exports.detail = async function (req, res) {
  const id = req.params.id.toString();
  try {
    const classItem = await poolean.query(
      `
  SELECT * 
  FROM \"Classes\"
  WHERE id = $1
  `,
      [id]
    );
    res.status(200).json(classItem.rows);
  } catch (err) {
    res.status(404).json({
      message: "The class with given ID was not found",
    });
  }
};

exports.addClass = async function (req, res) {
  const classInfo = req;
  
  try {
    const classid= uuidv4();
    const classItem = await poolean.query(
      `
    INSERT INTO \"Classes\" (id, name, section, subject, room)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [
        classid,
        classInfo.name,
        classInfo.section,
        classInfo.subject,
        classInfo.room,
      ]
    );
    const classacountItem = await poolean.query( `
    INSERT INTO classesaccount (classid, accountid, type)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [classid, classInfo.userid, true]
    );
    res.status(201).json({ data: classItem.rows, success: true });
  } catch (err) {
    res.status(404).json({
      message: "Recheck your submit information",
    });
  }
};
exports.addClassesAccount = async function (req, res) {
  const classInfo = req.body;

  try {
    const classItem = await poolean.query(
      `
    INSERT INTO classesaccount (classid, accountid, type)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [classInfo.classId, classInfo.accountId, classInfo.type]
    );
    res.status(201).json(classItem.rows);
  } catch (err) {
    res.status(404).json({
      message: "Recheck your submit information",
    });
  }
};
