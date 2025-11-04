const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000 

// Root Route => http://localhost:3000/api
router.get('/api', (req, res)=> {
    // res.send('album api')
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`,
        'All Artists': `http://localhost:${PORT}/api/artist`
    })
})

const endpoints = [
    'album',
    'artist'
]

// router.use('/api/album', require('./api/albumRoutes'))
// router.use('/api/artist', require('./api/artistRoutes'))
endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// Error Handling
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error this page does not exist</h1>')
})

module.exports = router