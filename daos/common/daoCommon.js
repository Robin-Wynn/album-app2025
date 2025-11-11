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

        // req.body => {}

        if (Object.keys(req.body).length === 0) {
            // Object.keys(obj) => array of keys or "properties"
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            // fields is the sql values
            const fields = Object.keys(req.body) 
            //Object.keys or Object.values returns an array
            const values = Object.values(req.body)

            // .execute can take 3 arguments
            connect.execute(                  //.join works on arrays and strings, join text or something to string or item in array
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error){
                        // res.json({
                        //     Last_id: dbres.insertId
                        // })
                        console.log(dbres)
                        res.render('pages/success', {
                            title: 'Success',
                            name: 'Success'
                        })
                    } else {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }

        // console.log(req)
        // res. send('complete') 
    },

    update: (req, res, table)=> {

        // check if id == number
        if (isNan(req.params.id)) {
            res.json({
                "error": true, 
                "message": "ID must be a number"
            })     // method on Object object{} that will return an array of properties
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {

            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? 
                    WHERE ${table}_id = ?
                ;`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if (!error) {
                        // res.send(`Changed ${dbres.changedRows} row(s)`)
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    } else {
                        // res.send('Error creating record')
                        res.json({
                            "error": true,
                            "message": error
                        })
                    }
                }
            )
        }
    },

    /** DANGER ZONE!! */
    delete: (res, table, id)=> {

        console.log(`${table}_id: ${id}`)

        connect.execute(
            `DELETE from ${table} WHERE ${table}_id = ${id};
            SET @num := 0;
            UPDATE ${table} SET ${table}_id = @num := (@num + 1);
            ALTER TABLE ${table} AUTO_INCREMENT = 1;
            `,
            (error, dbres)=> {
                if (!error) {
                    res.send('Record Deleted')
                } else {
                    res.json({
                        "error": true,
                        "message": error
                    })
                }
            }
        )
        
        // prompt('Are you sure you want to delete?')

        // do stuff
    }

}

module.exports = daoCommon