const http = require('http');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require('./controller/productsController');

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([a-zA-Z0-9_]+-)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    getProductById(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([a-zA-Z0-9_]+-)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3];
    // console.log(id);
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([a-zA-Z0-9_]+-)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    // console.log(id);
    deleteProductById(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'file not found' }));
    res.end();
  }
});
const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`server running at post ${port}`);
});
