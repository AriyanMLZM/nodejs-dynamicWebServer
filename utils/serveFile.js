const fsPromises = require('fs').promises

const serveFile = async (route, contentType, response, myEmitter) => {
  // read the html or other files and serve it
  try {
    const rawData = await fsPromises.readFile(
      route,
      !contentType.includes('image') ? 'utf8' : ''
    )
    const data =
      // handle the json files better
      contentType === 'application/json' ? JSON.parse(rawData) : rawData
    response.writeHead(route.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    })
    response.end(
      // handle the json files better
      contentType === 'application/json' ? JSON.stringify(data) : data
    )
  } catch (err) {
    // if there is an error in serving the file put the server error
    console.error(err)
    response.statusCode = 500
    // log the server error
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
    response.end()
  }
}

module.exports = serveFile
