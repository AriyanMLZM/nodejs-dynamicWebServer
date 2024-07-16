const http = require('http')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const EventEmitter = require('events')

const { getContentType, getRoute, serveFile, logger } = require('./utils')

const PORT = parseInt(process.env.PORT) || 3500
class Emitter extends EventEmitter {}
const myEmitter = new Emitter()

myEmitter.on('log', (msg, logFileName) => logger(msg, logFileName, __dirname))

const server = http.createServer((req, res) => {
  console.log('url: ' + req.url + '\tmethod: ' + req.method)
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
  
  const ext = path.extname(req.url)
  const contentType = getContentType(ext)
  let route = getRoute(contentType, req.url, __dirname)
  if (!ext && req.url.slice(-1) !== '/') route += '.html'

  const fileExists = fs.existsSync(route)
  if (fileExists) {
    serveFile(route, contentType, res, myEmitter)
  } else {
    switch (path.parse(route).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' })
        res.end()
        break
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res, myEmitter)
    }
  }
})

server.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
