const Order = require('../models/order');
const Product = require('../models/product');

module.exports.createOrder = (userId, orderData) => {
  return Product.find({ _id: { $in: orderData.products.map(p => p.productId) } })
    .then(products => {
      const orderedProducts = orderData.products.map(p => {
        const product = products.find(prod => prod._id.toString() === p.productId);
        return {
          productId: p.productId,
          productName: product.name,
          quantity: p.quantity
        };
      });

      const totalAmount = orderedProducts.reduce((total, p) => total + p.quantity * p.price, 0);

      const newOrder = new Order({
        userId: userId,
        orderedProducts: orderedProducts,
        totalAmount: totalAmount
      });

      return newOrder.save();
    })
    .then(order => !!order);
};

module.exports.getUserOrders = (userId) => {
  return Order.find({ userId: userId })
    .lean()
    .exec();
};

module.exports.getAllOrders = () => {
  return Order.find()
    .lean()
    .exec();
};
