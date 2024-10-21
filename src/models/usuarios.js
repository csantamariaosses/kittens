const pool  = require("../db/db")
const md5   = require("md5")

const getUser = async ( email, password ) => {
  //console.log("model-user:"+ email + " - " + password)
  //console.log("pwd:" + md5(password))
  const consulta  = "Select * from usuarios where usuario=? and password=? limit 1"
  const row =  await pool.query(consulta, [email, md5(password)])
  return row[0]  
}

module.exports = { getUser }
