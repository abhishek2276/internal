const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
        port: 5432,
        database: 'login',
        user: 'postgres',
        password: 'Abhi@2001',
})


const getFashion = (request, response) => {
    pool.query('SELECT * FROM fashion  ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getFashionById = (request, response) => {
    const product_id = parseInt(request.params.id)
    pool.query('SELECT * FROM fashion WHERE product_id = $1', [product_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createFashion = (request, response) => {
    const {
        product_id,
        name,
        brand,
        price,
        img,
    } = request.body
    pool.query('INSERT INTO fashion (product_id,name,brand,price,img) VALUES ($1, $2,$3,$4,$5)', [product_id,name,brand,price,img], (error, results) => {
        if (error) {
            throw error
        } 
        response.status(201).send(`User added with ID: ${results.product_Id}`)
    })
}
const updateFashion  = (request, response) => { 
    const product_id = parseInt(request.params.id)
    const { 
       
        name,
        brand,
        price,
        img,
    } = request.body
    pool.query(
        'UPDATE fashion SET name=$2,brand=$3,price=$4,img=$5 WHERE id = $1',
        [product_id,name,brand,price,img],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${results.product_id}`)
        }
    )
}
const deleteFashion  = (request, response) => {
    const product_id = parseInt(request.params.id)
    pool.query('DELETE FROM fashion WHERE product_id = $1', [product_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${product_id}`)
    })
}
module.exports = {
    getFashion ,
    getFashionById,
    createFashion,
    updateFashion ,
    deleteFashion ,
}