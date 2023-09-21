const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
        port: 5432,
        database: 'login',
        user: 'postgres',
        password: 'Abhi@2001',
})



const getUsers = (request, response) => {
    pool.query('SELECT * FROM main2   ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM main2 WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    const {
       
        name,
        email,
        password
    } = request.body
    pool.query('INSERT INTO main2 (name, email, password) VALUES ($1, $2,$3)', [name, email, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User added with ID: ${results.insertId}`)
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        
        name,
        email, password
    } = request.body
    pool.query(
        'UPDATE main2SET name = $2, email = $3 ,  password=$4 WHERE id = $1',
        [id,name, email, password],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${results.id}`)
        }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM main2 WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${results.id}`)
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}