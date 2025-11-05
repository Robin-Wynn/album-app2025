const con = require('../../config/dbconfig')

const bandDao = {
    table: 'band',

    findAlbumsByBand: (res, table, id)=> {
        let albums = []

        let sql = `SELECT album_id, title, yr_released FROM album WHERE band_id = ${id};`

        // .execute(query, callback function) <-- mysql2 
        // .execute(query, array, callback function)
        con.query()
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        albums.push(obj)
                    })


                    con.execute(
                        `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> {
                            rows.forEach(row => {
                                row.albums = albums
                            })
                            if (!error) {
                                res.json(...rows)
                            } else {
                                console.log('Dao Error:', error)
                            }
                        }
                    )

                } else {
                    res.json({
                        message: 'Error',
                        table:`${table}`,
                        error: error
                    })
                }
            }

    }
}

module.exports = bandDao