const http = require('http')
const {getProducts, getProductById} = require('./controller/productsController')

const server = http.createServer((req, res) =>{
  console.log(req.url);
  if(req.url === '/api/products'&& req.method === 'GET'){
     getProducts(req,res)
 
  }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
    const id = req.url.split('/')[3]
    getProductById(req, res, id)
  }
  else{
    res.writeHead(404, {'Content-Type':'application/json'})
    res.write(JSON.stringify({message: 'file not found'}))
    res.end()
  }
})
const port = process.env.PORT || 3333

server.listen(port, ()=>{
  console.log(`server running at post ${port}`);
})