const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController")
const usuarios = require("../models/usuarios")
const session = require('express-session')

router.get("/login", loginController.index);
router.post("/login", loginController.login)
router.post("/logout", loginController.logout)
/*
router.get("/login", function( req, res) {
  console.log("LOGIN")
  res.send("Loginnnn")
})
 
/*
router.post("/",  async( req, res) => {

  //console.log( req.body)
  const {user, password} = req.body

  //console.log(req.session)

  //console.log(req.session)
  //console.log("usr:" + user)
  //console.log("password:" + password)

  const data = await usuarios.getUser( user, password )
  
  if( data != undefined) {
    req.session.user = user
    req.session.admin = true
    req.session.firstName = "Carlos"
    console.log("Session ID:" + req.session.id)
    res.render( "admin", {user:req.session.user, firstName:req.session.firstName})
  
  } else {
    res.render("login", { statusMessage:"Usuario o password incorrectos"})
  }
    


})

router.get("/logout",  (req, res ) => {
  if( session) {
    console.log("Sesion activa")
    req.session.destroy()
  } else {
    console.log("Sesion inactiva")
  }
  res.redirect("/")
})
*/
 module.exports = router