let products = require('../data/products.json');
const db = require('../data/db');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
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
  return new Promise((resolve, reject) => {
    const q = `SELECT * FROM products WHERE id='${id}'`;
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
  const { name, description, price } = product;
  return new Promise((resolve, reject) => {
    const q = `UPDATE products SET name='${name}', description ='${description}', price='${price}'  WHERE id='${id}'`;
    db.query(q, function (err, result) {
      if (err) throw err;
      console.log(result);
      resolve(result);
    });
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
