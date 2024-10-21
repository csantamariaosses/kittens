const express = require("express")
const router = express.Router()
const razasController = require("../controllers/razasController")

router.get("/", razasController.index);
router.get("/razas", auth, razasController.index);
router.get("/razas-add", auth, razasController.createRaza);
router.post("/razas-save", auth, razasController.saveRaza)

router.get("/razas/:id", razasController.editRaza);
router.get("/razas-edit/:id", razasController.editRaza);
router.post("/razas-update/:id", razasController.updateRaza);
router.get("/razas-delete/:id", razasController.deleteRaza);



// proteccion de rutas
function auth(req, res, next ){
  if( req.session.user ) {
    console.log( req.session.user)
    next()
  } else {
    res.render("login")
  }
}


 module.exports = router