const path = require('path')

const getRoute = (contentType, url, dirName) => {
  // set the route based on the request url and make it dynamic
  let route =
    contentType === 'text/html' && url === '/'
      ? path.join(dirName, 'views', 'index.html')
      : contentType === 'text/html' && url.slice(-1) === '/'
      ? path.join(dirName, 'views', url, 'index.html')
      : contentType === 'text/html'
      ? path.join(dirName, 'views', url)
      : path.join(dirName, url)
  return route
}

module.exports = getRoute
