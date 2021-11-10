
const Pool = require("pg").Pool
const poolean = new Pool({
  user: 'postgres', 
  password: '12345678',
  database: 'postgres',
  host: 'database-2-instance-1.c7sn8vv4zz9k.us-east-1.rds.amazonaws.com',
  port: 5432
})
module.exports = poolean
