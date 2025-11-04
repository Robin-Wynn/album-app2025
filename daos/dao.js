const daoCommon = require('./common/daoCommon')

const albumDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/albumDao')
}

const artistDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/artistDao')
}

module.exports = {
    albumDao,
    artistDao
}