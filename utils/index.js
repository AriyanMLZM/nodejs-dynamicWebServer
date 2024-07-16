const getRoute = require('./getRoute')
const getContentType = require('./getContentType')
const serveFile = require('./serveFile')
const logger = require('./logger')

module.exports = {
  getRoute,
  getContentType,
  serveFile,
  logger,
}
