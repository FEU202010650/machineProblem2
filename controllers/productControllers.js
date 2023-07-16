const Product = require('../models/product');

module.exports.createProduct = (productData) => {
  const newProduct = new Product({
    name: productData.name,
    description: productData.description,
    price: productData.price
  });

  return newProduct.save()
    .then(product => !!product);
};

module.exports.getAllProducts = () => {
  return Product.find()
    .lean()
    .exec();
};

module.exports.getActiveProducts = () => {
  return Product.find({ isActive: true })
    .lean()
    .exec();
};

module.exports.getProduct = (productId) => {
  return Product.findById(productId)
    .lean()
    .exec();
};

module.exports.updateProduct = (productId, productData) => {
  return Product.findByIdAndUpdate(productId, productData)
    .then(result => !!result);
};

module.exports.archiveProduct = (productId) => {
  return Product.findByIdAndUpdate(productId, { isActive: false })
    .then(result => !!result);
};

module.exports.activateProduct = (productId) => {
  return Product.findByIdAndUpdate(productId, { isActive: true })
    .then(result => !!result);
};
