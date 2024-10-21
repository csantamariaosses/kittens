
const controller = {}
const razas = require("../models/razas")
const  pool = require("../db/db")
const fs = require("fs")
const path = require('path');


controller.index = async (req, res) => {
  console.log("controller - index - razas")
  //res.send("Razas-controller- Index")
  const razasArray = await razas.listarRazas()
  console.log(razasArray)
  res.render("razas/index", {user:req.session.user, firstName:req.session.firstName,razas:razasArray,admin:req.session.admin})
}

controller.renderRazas =  (req, res) => {
  res.send("Razas-controller- Index")
  //res.render("razas/index")
}

controller.createRaza = (req, res) => {
  //console.log("razasController.new")
  //res.send("Razas-controller- Add")
  res.render("razas/new",{admin:req.session.admin})
}

controller.saveRaza =  async  (req, res) => {

  //  console.log(req.body)
    //console.log(req.files)
    
    const {raza,caracteristicas,detalles} = req.body
  
    try {
      if( !req.files ) {      
        res.status(400).json({message:"Seleccione un archivo"})
      } else {
        let file = req.files.imagen
        const nuevoNombreImagen = formatArchivo( file )


        await razas.agregarRaza( raza, caracteristicas, detalles, nuevoNombreImagen)
        await file.mv("src/public/images/" + nuevoNombreImagen)
  
      }
    } catch (error) {
      console.log("Error;"+ error)
    }
  
    const razasArray =  await razas.listarRazas()
    res.render("razas", {user:req.session.user, firstName:req.session.firstName,razas:razasArray, admin:req.session.admin})
  
}

controller.editRaza = async (req, res) => {
  const id = req.params.id
  const [raza_] = await razas.getRaza(id)
  const raza = [raza_][0]
  res.render("razas/edit", {raza:raza,admin:req.session.admin})
}

controller.updateRaza = async (req, res) => {
  const {id, raza, caracteristicas, detalles} = req.body

  // actualiza datos
  if( req.files ) {
    console.log("cambio de imagen")
    // borra archivo antiguo
    const oldReg = await razas.getRaza(id)
    const oldImagen = oldReg[0].imagen
    console.log( "OldImagen:" + oldImagen)

    const archivoForDelete = pathFileImagen( oldImagen)
    borrarArchivo( archivoForDelete)

    let file = req.files.imagen
    console.log(`File Name: ${file.name}`);
    console.log(`File Size: ${file.size}`);
    console.log(`File MD5 Hash: ${file.md5}`);
    console.log(`File Mime Type: ${file.mimetype}`);

    const nuevoNombreImagen = formatArchivo( file )

    console.log(nuevoNombreImagen)

    await razas.updateRaza(id, raza, caracteristicas, detalles, nuevoNombreImagen )
    await file.mv("src/public/images/" + nuevoNombreImagen)

  } else {
    console.log("Misma imagen")
  } 
  const razasArray = await razas.listarRazas()
  res.render("razas" , {user:req.session.user, firstName:req.session.firstName,razas:razasArray,admin:req.session.admin})
}

controller.deleteRaza = async (req, res) => {
  //console.log("razasController.Delete" + req.params.id)
  const id =  req.params.id
  const raza = await razas.getRaza(id)
  const archivo = raza[0].imagen

  const archivoForDelete = pathFileImagen( archivo)
  
  // Eliminar archivo
  borrarArchivo( archivoForDelete)
  
  // eliminar registro de la bbdd
  try {
    const raza = await razas.deleteRaza(id)    
  } catch (error) {
    console.log(error)
  }

  const razasArray = await razas.listarRazas()
  res.render("razas" , {user:req.session.user, firstName:req.session.firstName,razas:razasArray,admin:req.session.admin})
}



module.exports = controller


function getExtension(filename) {
  return filename.split('.').pop();
}


function formateaNombreArchivo( file, id ){
  const nombre = file.name
  const arrNombre = nombre.split(".")
  const parteNombre = arrNombre[0]
  const parteExtension = arrNombre[1]

  const nuevoNombreImagen = parteNombre.concat("_",id,".",parteExtension)
  return nuevoNombreImagen
}


function pathFileImagen( nombreArchivo) {
  const dirname = __dirname
  const src = dirname.replace('controllers','public')
  const pathToFile = path.join(src,'\\images\\',nombreArchivo) 
  return pathToFile 
}


function borrarArchivo( pathArchivo) {
  // Eliminar archivo
  if (fs.existsSync( pathArchivo) ){
    try {
      fs.unlink( pathArchivo, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File is deleted.');
          return 1
        }
      })
    } catch (error) {
      console.error('Something wrong happened removing the file', error)
    }
  }
}

function getRandomArbitrary(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}


function formatArchivo( file ) {
  const randNumber = getRandomArbitrary(1, 999)
  const nombre = file.name
  const arrNombre = nombre.split(".")
  const parteNombre = arrNombre[0]
  const parteExtension = arrNombre[1]

  const nuevoNombreImagen = parteNombre.concat("_",randNumber,".",parteExtension)
  return nuevoNombreImagen
}