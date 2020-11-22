const Product = require('../models/productModel');

//@desc  get all products
// @route GET api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}
//@desc  get product by id
// @route GET api/products/:id
async function getProductById(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);
  }
}

//@desc  create products
// @route POT api/products
async function createProduct(req, res) {
  try {
    const product = {
      title: 'test',
      description: 'test description',
      price: 100,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getProducts, getProductById, createProduct };
