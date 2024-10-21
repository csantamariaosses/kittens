const express = require("express")
const router = express.Router()

//import { Router } from "express";
const {
  createCustomers,
  deleteCustomer,
  editCustomer,
  renderCustomers,
  updateCustomer,
} =  require("../controllers/customerController.js");


router.get("/", renderCustomers);
router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);

module.exports = router;

