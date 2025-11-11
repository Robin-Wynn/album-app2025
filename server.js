// build server
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3000 

// handle security
const helmet = require('helmet')
const cors = require('cors')

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
// allows us to parse a req, format it in json, and display it in an object
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Hey, I'm using ejs as my view engine!
server.set('view engine', 'ejs')

// localhost:3000
server.use('/', router)

server.listen(PORT, ()=> console.log(`PORTY OVER HERE (～￣▽￣)～ `))