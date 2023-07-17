const express = require('express');
const productController = require('../controllers/productController');

 

const router = express.Router();

 

router.post('/', productController.insertProduct);
router.get('/initial/:productId', productController.getProductById);
router.get('/active', productController.getActiveProducts);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

 

module.exports = router;