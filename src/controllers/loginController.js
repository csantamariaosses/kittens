const controller = {}
const  usuarios = require("../models/usuarios")

controller.index =  (req, res) => {
  //res.send("Login -controller- Index")
  res.render("login")
}


controller.login = async  (req, res) => {
  const {user, password} = req.body
  console.log(user+  ' ' + password)
  const data = await usuarios.getUser( user, password )
  if( data != undefined) {
    req.session.user = user
    req.session.admin = true
    req.session.firstName = "Carlos"
    console.log("Session ID:" + req.session.id)
    res.render( "admin/index", {user:req.session.user, firstName:req.session.firstName, admin:req.session.admin})
  
  } else {
    res.render("login", { statusMessage:"Usuario o password incorrectos"})
  }

 // res.send("Login -controller- LOGIN")

  //res.render("login")
}



controller.logout = async  (req, res) => {
  if( session) {
    console.log("Sesion activa")
    req.session.destroy()
  } else {
    console.log("Sesion inactiva")
  }
  res.render("index",{session:false})
}
module.exports = controller