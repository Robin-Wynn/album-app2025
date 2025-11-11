const router = require('express').Router()

const { artistDao : dao } = require('../../daos/dao')

// GET
// http://localhost:300/api/artist
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

router.get('/get_albums/:id', (req, res)=> {
    dao.findAlbumsByArtist(res, dao.table, req.params.id)
})

// http://localhost:3000/api/artsit/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// This should be the last .get method
// http://localhost:3000/api/artist/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// POST requests go below GET requests
// http://localhost:3000/api/artist/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router