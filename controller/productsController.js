const Product = require('../models/productModel');

const { bodyParser } = require('../utils');

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
    let product = [];
    product = await Product.findById(id);
    console.log(product);
    if (product.length === 0) {
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
// @route POST api/products
async function createProduct(req, res) {
  try {
    const body = await bodyParser(req);

    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };

    const result = await Product.create(product);
    if (result) {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'post inserted' }));
    }
  } catch (err) {
    console.log(err);
  }
}

//@desc  update products
// @route PUT api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found update' }));
    } else {
      const body = await bodyParser(req);

      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await Product.update(id, productData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (err) {
    console.log(err);
  }
}
//@desc  delete product by id
// @route DELETE api/products/:id
async function deleteProductById(req, res, id) {
  console.log('delete ctrl');
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      await Product.rmv(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product deleted' }));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
