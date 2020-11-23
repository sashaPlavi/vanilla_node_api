const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    product = products.find((p) => p.id === id);
    resolve(product);
  });
}
function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile('./data/products.json', products);
    resolve(newProduct);
  });
}
function update(id, product) {
  return new Promise((resolve, reject) => {
    console.log(id);
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    console.log(products);
    writeDataToFile('./data/products.json', products);
    resolve(products[index]);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
};
