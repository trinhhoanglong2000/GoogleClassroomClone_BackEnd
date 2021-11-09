const mysql = require('mysql')
exports.connectionInfo ={
  // host: 'localhost',
  // user: 'root',
  // password: 'mysql',
  // database: 'classroomdb'
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6448526',
  password: 'IFmrHRw646',
  database: 'sql6448526'
}

exports.createConnection = () => {
  return mysql.createConnection(this.connectionInfo)
}

exports.connectDB = (connection) => {
  connection.connect(function(err) {
    if (!!err)
    { 
      console.log("Database connect error!!!");
    } 
    else
    {
      console.log("Database is connected!!!");
    }
  });
}
exports.disconnectDB = (connection) =>{
  connection.end (function(err){
    if (!err){
      console.log("close db")
    }
  })
}


