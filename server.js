const http = require('http')
const path = require('path')
require('dotenv').config()

const { getContentType, getRoute } = require('./utils')

const PORT = parseInt(process.env.PORT) || 3500

const server = http.createServer((req, res) => {
  console.log('url: ' + req.url + '\tmethod: ' + req.method)

  const ext = path.extname(req.url)
  const contentType = getContentType(ext)
  const route = getRoute(contentType, req.url, __dirname)

  
})

server.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
