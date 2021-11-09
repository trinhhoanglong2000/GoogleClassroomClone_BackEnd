const app = require("../../app");
const classes = require("./mock");
const database =  require("../../Database");

exports.GetAllClasses = (callback) => {
  var connection = database.createConnection()
  database.connectDB(connection);
  connection.query("SELECT * FROM classes", function (err, result, fields) 
  {
    if (!err) 
    {
      callback(result)
    } 
    else 
    {
      console.log(err);
      callback(null)
    }     
  });
  database.disconnectDB(connection)
};

exports.addClass = (classInfo,callback) => {
  var connection = database.createConnection()
  database.connectDB(connection);
  connection.query( 'INSERT INTO classes (Class_Name, Teacher,Quantity) VALUES (' + '"' +  classInfo.className + '"' +  ","  + '"' + classInfo.teacherName + '"' + "," 
                  +  classInfo.quantity +")" ,function (err, result) 
  {
    if (!err) 
    {
      callback(200)
    } 
    else 
    {
      console.log(err);
      callback(404)
    }     
  });
  database.disconnectDB(connection)
}

exports.detail = (id) => classes.find(item => parseInt(item.id) === parseInt(id));

