const express = require('express')
const router = express.Router()

// Root Route => http://localhost:3000/api
router.get('/api', (req, res)=> {
    // res.send('album api')
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`
    })
})

router.use('/api/album', require('./api/albumRoutes'))

// Error Handling
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error this page does not exist</h1>')
})

// router.use((req, res) => {
//     res.status(404).render('404', {
//         title: '404 Not Found',
//         message: `Oops! The page "${req.originalUrl}" doesn't exist.`
//     })
// })

module.exports = router