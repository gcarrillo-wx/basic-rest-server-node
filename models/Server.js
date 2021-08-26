const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000

        //middlewares
        this.middlewares()

        //routes
        this.routes()
    }

    middlewares() {
        //CORS
        this.app.use( cors() )

        //parseo del body a JSON
        this.app.use( express.json() )

        //public folder
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/user'))
    }

    listen() {
        console.clear()
        this.app.listen(this.port,() => {
            console.log('App iniciada en puerto: ', this.port)
        })
    }
}

module.exports = Server