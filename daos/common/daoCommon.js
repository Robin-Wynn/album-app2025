const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryActions')

const daoCommon = {

    // create methods that will query the database
    findAll: (req, res, table)=> {

        // .query(sql query, callback func)
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    // method to get id from tables
    findById: (res, table, id)=> {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    sort: (res, table, sorter)=> {

        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,

            (error, rows)=> {

                queryAction(res, error, rows, table)
            }
        )
    },

    create: (req, res, table)=> {

        if (Object.keys(req.body).length ===0) {
            // Object.keys(obj) => array of keys
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error){
                        res.json({
                            Last_id: dbres.insertId
                        })
                    } else {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }

        // console.log(req)
        // res. send('complete') 
    }

}

module.exports = daoCommon