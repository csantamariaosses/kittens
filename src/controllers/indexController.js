const controller = {}

controller.index =  (req, res) => {
  //res.send("Index-controller- Index")
  res.render("index")
}

module.exports = controller