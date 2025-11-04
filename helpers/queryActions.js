const queryAction =(obj, e, r)=> {

    const results = ()=> {

        (error, rows)=> {

                if (!e) {
                    if (r.length == 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`Dao Error: ${e}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error
                    })
                }
            }

    }

    return results
}

module.exports = { 
    queryAction
}