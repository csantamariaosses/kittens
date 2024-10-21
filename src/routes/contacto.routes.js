const express = require("express")
const router = express.Router()
const contactoController = require("../controllers/contactoController")

router.get("/contacto", contactoController.index)
router.post("/contacto", contactoController.send)


 module.exports = router