const multer = require('multer');
const path = require('path');
const productModel = require('../models/productModel');

 

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public'),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});
const upload = multer({ storage }).single('productImage');

 

// API to insert a new product
const insertProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Error uploading the product image' });
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

 

    const newProduct = {
      productId: req.body.productId,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productImage: req.file.filename,
      isActive: req.body.isActive,
    };


    productModel.insertProduct(newProduct);

 

    res.status(201).json({ message: 'Product created successfully' });
  });
};

 

// API to get product information by productId
const getProductById = (req, res) => {
  const productId = req.params.productId;
  const product = productModel.getProductById(productId);

 

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
};

 

// API to get a list of active products available
const getActiveProducts = (req, res) => {
  const products = productModel.getActiveProducts();

 

  if (products.length > 0) {
    res.json(products);
  } else {
    res.json({ message: 'No active products found' });
  }
};

 

// API to update product by productId
const updateProduct = (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    isActive: req.body.isActive,
  };

 

  productModel.updateProduct(productId, updatedProduct);

 

  res.json({ message: 'Product updated successfully' });
};

 

// API to delete a product by productId
const deleteProduct = (req, res) => {
  const productId = req.params.productId;
  productModel.deleteProduct(productId);

 

  res.json({ message: 'Product deleted successfully' });
};

 

module.exports = {
  insertProduct,
  getProductById,
  getActiveProducts,
  updateProduct,
  deleteProduct,
};