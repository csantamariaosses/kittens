const controller = {}
const nodemailer = require("nodemailer")

controller.index =  (req, res) => {
  res.render("contacto/index")
}

/****
 * Usa mailtrap como buzon de pruebas
 * https://mailtrap.io/
 */

controller.send = async (req, res) => {
  const {nombre, apellido, email, mensaje} = req.body
  const emailSaliente = {
    to: email,
    from: 'atencionclientes@kittens.cl',
    subject: 'Mensaje desde portal',
    html:`${nombre} ${apellido} ha enviado el siguiente mensaje ${mensaje}`
  }

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        
      user: "516a32ec3de7da",
      pass: "2f3b19d55c59cd"
    }
  })

  
  try {
    const sendMailStatus = await transport.sendMail( emailSaliente )
    let statusMessage = ""
    if( sendMailStatus.rejected.lenght) {
      statusMessage="Error al enviar mensaje"
    }else{
      statusMessage="Mensaje enviado"
    }
    res.render( "contacto", {statusMessage})
  } catch (error) {
    res.render( "contacto", {statusMessage:`Servidor fuera de servicio ${error}`})
  }
  

}

module.exports = controller