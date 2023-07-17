const { log } = require('console');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/product.json');


// Read products data from the JSON file
const getProducts = () => {
  const productsData = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(productsData);
};

// Write products data to the JSON file
const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
};

// Get product by productId
const getProductById = (productId) => {
  const products = getProducts();
  return products.find((product) => product.productId === productId);
};

// Get list of active products
const getActiveProducts = () => {
  const products = getProducts();
  console.log(products);
  return products.filter((product) => product.isActive);
};

// Insert a new product
const insertProduct = (newProduct) => {
  const products = getProducts();
  products.push(newProduct);
  saveProducts(products);
};

// Update product by productId
const updateProduct = (productId, updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex((product) => product.productId === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
  }
};

// Delete product by productId
const deleteProduct = (productId) => {
  const products = getProducts();
  const filteredProducts = products.filter((product) => product.productId !== productId);
  saveProducts(filteredProducts);
};

module.exports = {
  getProducts,
  saveProducts,
  getProductById,
  getActiveProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
};

