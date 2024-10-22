const dotenv = require('dotenv')

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const hbs = require("express-handlebars")
const session = require('express-session')

// Rutas
const indexRouter = require("./routes/index.routes")
const razasRouter = require("./routes/razas.routes")
const customerRouter = require("./routes/customer.routes")
const contactoRouter = require("./routes/contacto.routes")
const loginRouter = require("./routes/login.routes")
const logoutRouter = require("./routes/logout.routes")


// Subida de archivos con multer
// FILE-UPLOAD CON MULTER
const fileupload = require("express-fileupload")
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser')
const morgan = require("morgan")

app.use(express.urlencoded({extended: true})); //Esto es para formData
app.use(express.json())

//dotenv.config({ path: path.join(__dirname, '..', '.env.testing') });
dotenv.config({ path: path.join(__dirname, '.env') });


// proteccion de rutas
function auth(req, res, next ){
  if( req.session.user ) {
    console.log( req.session.user)
    next()
  } else {
    res.render("login")
  }
}



//DDBB
const pool = require("../src/db/db")
const razas = require("../src/models/razas")



// Configuaracion express-handlebars
app.engine(".hbs", hbs.engine({ extname:"hbs"}))
app.set('view engine', 'hbs');
app.set('views', __dirname +'/views');



// Archivos estaticos
app.use(express.static(__dirname + "/public"))

// Config subida de archivos
app.use( fileupload ({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, 'uploads')
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    //cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    cb(null, file.fieldname + '-' + ext);
  }
})
const upload = multer( {
  storage:storage
})




app.use(session({ resave: false ,secret: '123456' , saveUninitialized: true}));

// rutas
app.use(indexRouter)
app.use(razasRouter)
app.use(customerRouter)
app.use(contactoRouter)
app.use(loginRouter)
app.use(logoutRouter)
/*app.get("/login", function(req, res ) {
  res.send("LOGIN")
})
*/




// Listening
app.listen(PORT, function(error) {
  error? console.log(error):console.log(`Servidor corriendo en puerto:${PORT}...`)
})