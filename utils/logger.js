const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const logger = async (msg, logFileName, dirName) => {
  const dateTime = format(new Date(), 'yyyy.MM.dd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`

  try {
    if (!fs.existsSync(path.join(dirName, 'logs'))) {
      await fsPromises.mkdir(path.join(dirName, 'logs'))
    }

    await fsPromises.appendFile(path.join(dirName, 'logs', logFileName), logItem)
  } catch (err) {
    console.error(err)
  }
}

module.exports = logger
