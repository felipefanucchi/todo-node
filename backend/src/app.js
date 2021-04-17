const express = require('express')
const routes = require('./routes')

class AppController {
  constructor() {
    this.express = express()

    this.express.middlewares()
    this.express.routes()
  }

  middlewares() {
    this.express.use( express.json() )
  }
 
  routes() {
    this.express.use( routes )
  }
}

module.exports = new AppController().express
