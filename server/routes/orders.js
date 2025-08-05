const router = require('express').Router();
let Order = require('../models/order.model');
const auth = require('../middleware/auth'); // Import the auth middleware

// --- Get all orders (for admin purposes later, maybe) ---
router.route('/').get((req, res) => {
  Order.find()
    .populate('user', 'username')
    .populate('products.product')
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});


// --- ADD A NEW ORDER (SECURE ROUTE) ---
// We add "auth" as the second argument. This middleware will run BEFORE the main route logic.
router.route('/add').post(auth, async (req, res) => {
  try {
    const { cart, total } = req.body;

    // The 'auth' middleware added the user's ID to the request object
    const userId = req.user;

    // Map the cart items to the format expected by our Order schema
    const products = cart.map(item => ({
      product: item._id,
      quantity: item.quantity
    }));

    const newOrder = new Order({
      user: userId,
      products: products,
      total: total
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/myorders').get(auth, async (req, res) => {
    try {
        // Find all orders where the 'user' field matches the logged-in user's ID
        // The user ID is added to req.user by our 'auth' middleware
        const orders = await Order.find({ user: req.user })
            .populate('products.product', 'name price'); // Populate product details

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;