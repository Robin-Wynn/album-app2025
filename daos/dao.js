const daoCommon = require('./common/daoCommon')

const albumDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/albumDao')
}

const artistDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/artistDao')
}

const bandDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/bandDao')
}

const labelDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/labelDao')
}

module.exports = {
    albumDao,
    artistDao,
    bandDao,
    labelDao
}