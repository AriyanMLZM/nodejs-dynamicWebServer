const fsPromises = require('fs').promises

const serveFile = async (route, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      route,
      !contentType.includes('image') ? 'utf8' : ''
    )
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData
    response.writeHead(route.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    })
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    )
  } catch (err) {
    console.error(err)
    response.statusCode = 500
    response.end()
  }
}

module.exports = serveFile
