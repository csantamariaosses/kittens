const pool  = require("../db/db")
const path = require('path');



const agregarRaza = async ( raza, caracteristicas, detalles, imagen ) => {
  console.log("insertando:"+ raza + " " + caracteristicas + " " +  detalles + " " + imagen)
  try {
    const consulta  = "insert into razas ( raza, caracteristicas, detalles, imagen) values (?,?,?,?); "
    const row =  await pool.query(consulta, [raza, caracteristicas, detalles, imagen])
    return row

  } catch (error) {
    console.log("Error " + error)
  }

}

async function listarRazas() {
   try {
   
    let dirName = __dirname
    //console.log( "DirName:"+ dirName);

    let DirTmp = 'C:\\Incluyeme\\projecto\\kittens\\tmp\\'
   

    const query = `select id, raza, caracteristicas, detalles, imagen from razas`
    //console.log( query )
    const rows = await pool.query( query )
    return rows
    
   } catch (error) {
    console.log("Error:" + error)
   }
}

async function getRaza( id ) {
  try {
    const query = "select id, raza, caracteristicas, detalles, imagen from razas where id= ? "

    const raza = await pool.query( query, [id] )
    //console.log( "Raza:" + JSON.stringify(raza))
    return raza 
  } catch (error) {
    console.log("Error " + error)
  }
}


async function deleteRaza( id ) {
  try {
    const query = "delete from razas where id= ? "

    const raza = await pool.query( query, [id] )
    return raza 
  } catch (error) {
    console.log("Error " + error)
  }
}


const updateRaza = async ( id, raza, caracteristicas, detalles, imagen  ) => {
  console.log("actualiza:"+ raza )

  try {
    const consulta  = "update razas set raza=?, caracteristicas=?, detalles=?, imagen=? where id= ? "
    const row =  await pool.query(consulta, [raza, caracteristicas, detalles, imagen, id ])
    return row
  } catch (error) {
    console.log("Error " + error)
  }

}

module.exports = { agregarRaza, listarRazas, getRaza, deleteRaza, updateRaza }
