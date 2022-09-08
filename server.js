// DEPENDENCIES --------------------
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { findById } = require('./models/products.js');
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
app.use(express.static("public"));
app.use(methodOverride("_method"));

// ROUTES
app.get("/", (req, res) => {
  res.redirect("/products")
})
// SEED
app.get('/products/seed', (req, res) => {
  Product.deleteMany({}, (error, allProducts) => { });
  Product.create([
    {
      name: 'Beans',
      description: 'A small pile of beans. Buy more beans for a big pile of beans.',
      img: 'https://imgur.com/LEHS8h3.png',
      price: 5,
      qty: 99
    }, {
      name: 'Bones',
      description: 'It\'s just a bag of bones.',
      img: 'https://imgur.com/dalOqwk.png',
      price: 25,
      qty: 0
    }, {
      name: 'Bins',
      description: 'A stack of colorful bins for your beans and bones.',
      img: 'https://imgur.com/ptWDPO1.png',
      price: 7000,
      qty: 1
    }
  ],
    (error, data) => {
      res.redirect('/products')
    }
  );
});

// INDEX
app.get('/products', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('index.ejs', {
      products: allProducts,
      tabTitle: "Index",
    });
  });
});


// NEW
app.get("/products/new", (req, res) => {
  res.render("new.ejs", {
    tabTitle: "New"
  });
});

// DELETE
app.delete('/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/products');
  });
});

// UPDATE
app.put("/products/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedProduct) => {
    res.redirect(`/products/${req.params.id}`);
  });
});

// CREATE
app.post('/products', (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
  });
});

// EDIT 
app.get("/products/:id/edit", (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('edit.ejs', {
      product: foundProduct,
      tabTitle: "Edit"
    });
  });
});

// This will be used to reduce the quantity by 1 each time the buy button is pressed
// BUY
app.put("/products/:id/buy", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedProduct) => {
    updatedProduct.qty -= 1;
    updatedProduct.save();
    res.redirect(`/products/${req.params.id}`);
  });
});

// SHOW
app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('show.ejs', {
      product: foundProduct,
      tabTitle: "Show"
    });
  });
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening in port...", PORT);
})