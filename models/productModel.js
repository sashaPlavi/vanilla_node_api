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
  });
}
function findById(id) {
  const q = `SELECT * FROM products WHERE id='${id}'`;
  return new Promise((resolve, reject) => {
    db.query(q, function (err, result) {
      if (err) throw err;
      console.log(result);
      resolve(result);
    });
  });
}
function create(product) {
  const { name, description, price } = product;
  const id = uuidv4();
  const q = `INSERT INTO products (id, name, description, price) VALUES ('${id}', '${name}', '${description}', ${price})`;
  // console.log(q);
  return new Promise((resolve, reject) => {
    db.query(q, function (err, result) {
      if (err) throw err;
      console.log(result);
      resolve(result);
    });
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
    const q = `DELETE FROM products WHERE id='${id}'`;
    console.log(q);
    db.query(q, function (err, result) {
      if (err) throw err;
      console.log(result);
      resolve(result);
    });
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  rmv,
};
