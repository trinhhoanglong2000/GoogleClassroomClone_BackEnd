
const Pool = require("pg").Pool
const poolean = new Pool({
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: 5432
})
module.exports = poolean
