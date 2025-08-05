const router = require('express').Router();
let Product = require('../models/product.model');
const ownerAuth = require('../middleware/ownerAuth'); // <-- 1. IMPORT ownerAuth

// This route can remain public, anyone can see the menu
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(ownerAuth, (req, res) => {
  const { name, description, price } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
  });

  newProduct.save()
    .then((savedProduct) => res.json(savedProduct))
    .catch(err => res.status(400).json({ error: 'Error: ' + err.message }));
});

module.exports = router;