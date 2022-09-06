// DEPENDENCIES --------------------
const express = require('express');
const app = express();
require('dotenv').config();
const Product = require('./models/products.js')

// DATABASE CONNECTION --------------------

// MIDDLEWARE

// ROUTES

// SEED

// INDEX
// NEW
// DELETE
// UPDATE
// CREATE
// EDIT
// SHOW

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening in port...", PORT);
})