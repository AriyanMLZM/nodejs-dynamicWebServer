const http = require('http')
require('dotenv').config()

const PORT = parseInt(process.env.PORT) || 3500

const server = http.createServer((req, res) => {
  console.log('url: ' + req.url + '\tmethod: ' + req.method)
  res.end("hello from server")
})

server.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
