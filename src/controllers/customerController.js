//import { pool } from "../db.js";
const controller = {}

controller.renderCustomers = async (req, res) => {
  //const [rows] = await pool.query("SELECT * FROM customer");
  //res.render("customers", { customers: rows });
};

controller.createCustomers = async (req, res) => {
  const newCustomer = req.body;
  //await pool.query("INSERT INTO customer set ?", [newCustomer]);
  //res.redirect("/");
};

controller.editCustomer = async (req, res) => {
  //const { id } = req.params;
  //const [result] = await pool.query("SELECT * FROM customer WHERE id = ?", [
  //  id,
  //]);
  //res.render("customers_edit", { customer: result[0] });
};

controller.updateCustomer = async (req, res) => {
  //const { id } = req.params;
  //const newCustomer = req.body;
  //await pool.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id]);
  //res.redirect("/");
};

controller.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  //const result = await pool.query("DELETE FROM customer WHERE id = ?", [id]);
  //if (result.affectedRows === 1) {
  //  res.json({ message: "Customer deleted" });
 // }
 // res.redirect("/");
};


module.exports = controller