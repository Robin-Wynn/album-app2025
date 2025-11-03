// build server
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3000 

// handle security
const helmet = require('helmet')
const cors = required('cors')

// configuring helmet
// server.use(helmet())
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": [" 'self ' ", "https: data"],
        "scriptSrc": [" ' self ' ", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// localhost:3000
server.use('/', router)

server.listen(PORT, ()=> console.log(`PORTY OVER HERE (～￣▽￣)～ `))