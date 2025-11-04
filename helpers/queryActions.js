const queryAction =(obj, e, r, t)=> {

    if (!e) {

        if (r.length == 1) {
            res.json(...r)
        } else {
            obj.json(r)
        }

    } else {

        console.log(`Dao Error: ${e}`)
        res.json({
            "message": 'error',
            'table': `${t}`,
            'error': error
        })
        
    }

}

module.exports = { 
    queryAction
}