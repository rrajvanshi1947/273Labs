var log = require('./logger')(module)
log.info('App has been started in info mode')
log.level = 'debug'
log.debug('app has been started in debug mode')
log.error('met an error')