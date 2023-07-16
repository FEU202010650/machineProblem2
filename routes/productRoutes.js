const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth');

router.post('/', auth.verify, auth.isAdmin, (req, res) => {
  productController.createProduct(req.body)
    .then(resultFromController => res.send(resultFromController));
});

router.get('/', (req, res) => {
  productController.getAllProducts()
    .then(resultFromController => res.send(resultFromController));
});

router.get('/active', (req, res) => {
  productController.getActiveProducts()
    .then(resultFromController => res.send(resultFromController));
});

router.get('/:productId', (req, res) => {
  productController.getProduct(req.params.productId)
    .then(resultFromController => res.send(resultFromController));
});

router.patch('/:productId', auth.verify, auth.isAdmin, (req, res) => {
  productController.updateProduct(req.params.productId, req.body)
    .then(resultFromController => res.send(resultFromController));
});

router.patch('/:productId/archive', auth.verify, auth.isAdmin, (req, res) => {
  productController.archiveProduct(req.params.productId)
    .then(resultFromController => res.send(resultFromController));
});

router.patch('/:productId/activate', auth.verify, auth.isAdmin, (req, res) => {
  productController.activateProduct(req.params.productId)
    .then(resultFromController => res.send(resultFromController));
});

module.exports = router;
