let products = require('../data/products.json');
const db = require('../data/db');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
  console.log('bla conected');
  //console.log(db);
  return new Promise((resolve, reject) => {
    const q = 'SELECT * FROM products';
    db.query(q, function (err, result) {
      if (err) throw err;
      console.log(result);
      resolve(result);
    });
    //products = { message: 'bla' };
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
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    writeDataToFile('./data/products.json', products);
    resolve(products[index]);
  });
}
function rmv(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile('./data/products.json', products);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  rmv,
};
