const express = require('express');
const productRoutes = require('./src/routes/productRoutes')

 

const app = express();

 

app.use(express.json());
app.use('/products', productRoutes);

 

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});