const router = require('express').Router()

const { labelDao : dao } = require('../../daos/dao')

// http://localhost:3000/api/label
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

// router.get('/get_albums/:id', (req, res)=> {
//     dao.findAlbumsByLabelId(res, dao.table, req.params.id)
// })

// http://locahost:3000/api/label/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// POST requests go below GET requests
// http
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router