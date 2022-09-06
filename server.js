// DEPENDENCIES --------------------
const express = require('express');
const app = express();
require('dotenv').config();
const Product = require('./models/products.js')

// DATABASE CONNECTION --------------------

// MIDDLEWARE

// ROUTES
app.get("/", (req, res) => {
  res.redirect("/products")
})
// SEED

// INDEX
app.get("/products", (req, res) => {
  res.send("index page")
})

// NEW
app.get("/products/new", (req, res) => {
  res.send("new product")
})

// DELETE
app.delete("/products/:id", (req, res) => {
  res.send("Delete product")
})

// UPDATE
app.put("/products/:id", (req, res) => {
  res.send("update product")
})

// CREATE
app.post("/products", (req, res) => {
  res.send("create product")
})

// EDIT
app.get("/products/edit/:id", (req, res) => {
  res.send("edit product")
})

// SHOW
app.get("/products/:id", (req, res) => {
  res.send("show product")
})

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening in port...", PORT);
})