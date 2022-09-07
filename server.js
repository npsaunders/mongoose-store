// DEPENDENCIES --------------------
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js')

// DATABASE CONNECTION --------------------
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
  res.redirect("/products")
})
// SEED

// INDEX
app.get('/products', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('index.ejs', {
      products: allProducts,
      tabTitle: "Index"
    });
  });
});


// NEW
app.get("/products/new", (req, res) => {
  res.render("new.ejs", {
    tabTitle: "New"
  })
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
app.post('/products', (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
  });
});


// SHOW
app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('show.ejs', {
      product: foundProduct,
      tabTitle: "Show"
    });
  });
})

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening in port...", PORT);
})