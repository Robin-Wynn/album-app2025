const daoCommon = require('./common/daoCommon')

const albumDao = {
    ...daoCommon,  //spread operator removes {}
    ...require('./api/albumDao')
}

module.exports = {
    albumDao
}