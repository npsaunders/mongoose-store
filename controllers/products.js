// DEPENDENCIES --------------------
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product.js');

// ROUTES
productRouter.get("/", (req, res) => {
  res.redirect("/products")
})

// Seed
const productSeed = require('../models/productSeed');
productRouter.get('/seed', (req, res) => {
  Product.deleteMany({}, (error, allProducts) => { });
  Product.create(productSeed, (error, data) => {
    res.redirect('/products');
  });
});

// INDEX
productRouter.get('/', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('index.ejs', {
      products: allProducts,
    });
  });
});


// NEW
productRouter.get("/new", (req, res) => {
  res.render("new.ejs");
});

// DELETE
productRouter.delete('/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/products');
  });
});

// UPDATE
productRouter.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedProduct) => {
    res.redirect(`/products/${req.params.id}`);
  });
});

// CREATE
productRouter.post('/', (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
  });
});

// EDIT 
productRouter.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('edit.ejs', {
      product: foundProduct
    });
  });
});

// This will be used to reduce the quantity by 1 each time the buy button is pressed
// BUY
productRouter.put("/:id/buy", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedProduct) => {
    updatedProduct.qty -= 1;
    updatedProduct.save();
    res.redirect(`/products/${req.params.id}`);
  });
});

// SHOW
productRouter.get('/:id', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('show.ejs', {
      product: foundProduct
    });
  });
});

// Exports 
module.exports = productRouter;