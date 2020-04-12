const AutoUpload = require('@minjs/cdn-node-ssh')

const config = require('../config/deploy.config')
config.remote += '/wx/cxzwfw'
config.local = 'dist'

const upload = new AutoUpload(config)

upload.start()
