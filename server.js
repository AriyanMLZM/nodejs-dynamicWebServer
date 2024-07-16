const http = require('http')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const EventEmitter = require('events')

const { getContentType, getRoute, serveFile, logger } = require('./utils')

// declare Objects
const PORT = parseInt(process.env.PORT) || 3500
class Emitter extends EventEmitter {}
const myEmitter = new Emitter()

// declare the Emitter
myEmitter.on('log', (msg, logFileName) => logger(msg, logFileName, __dirname))

// create the server
const server = http.createServer((req, res) => {
  console.log('url: ' + req.url + '\tmethod: ' + req.method)
  // log the request
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
  
  // get the extension of the requested file
  const ext = path.extname(req.url)
  // get the contentType based on the ext for header
  const contentType = getContentType(ext)
  // set the file path
  let route = getRoute(contentType, req.url, __dirname)
  // add the html ext for the url request
  if (!ext && req.url.slice(-1) !== '/') route += '.html'

  // check if the requested file exits
  const fileExists = fs.existsSync(route)
  if (fileExists) {
    // serve the requested file
    serveFile(route, contentType, res, myEmitter)
  } else {
    switch (path.parse(route).base) {
      // have some redirection if needed
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' })
        res.end()
        break
      // handle the not found 404 status code
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res, myEmitter)
    }
  }
})

server.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
