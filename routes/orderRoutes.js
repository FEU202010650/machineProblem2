const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');
const auth = require('../auth');

router.post('/checkout', auth.verify, (req, res) => {
  const userId = auth.decode(req.headers.authorization).id;
  orderController.createOrder(userId, req.body)
    .then(resultFromController => res.send(resultFromController));
});

router.get('/user', auth.verify, (req, res) => {
  const userId = auth.decode(req.headers.authorization).id;
  orderController.getUserOrders(userId)
    .then(resultFromController => res.send(resultFromController));
});

router.get('/', auth.verify, auth.isAdmin, (req, res) => {
  orderController.getAllOrders()
    .then(resultFromController => res.send(resultFromController));
});

module.exports = router;
