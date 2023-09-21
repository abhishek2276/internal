const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
        port: 5432,
        database: 'login',
        user: 'postgres',
        password: 'Abhi@2001',  
})
 

const getProduct = (request, response) => {
    pool.query('SELECT * FROM products  ', (error, results) => {
        if (error) {
            throw error
        } 
        response.status(200).json(results.rows)
    })
}
const getProductById = (request, response) => {
    const product_id = parseInt(request.params.id)
    pool.query('SELECT * FROM products WHERE product_id = $1', [product_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createProduct  = (request, response) => {
    const {
        product_id,
        product_name,
        product_price,
        product_brand,
        RAM,
        ROM,
        back_cam,
        front_cam,
        display,
        processor,
        discount,
        product_img,
    } = request.body
    pool.query('INSERT INTO products (product_id, product_name,product_price, product_brand,"RAM","ROM",back_cam,front_cam,display,processor,discount,product_img) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [product_id, product_name,product_price, product_brand,RAM,ROM,back_cam,front_cam,display,processor,discount,product_img], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}
const updateProduct  = (request, response) => {
    const product_id = parseInt(request.params.id)
    const {
       
        product_name,
        product_price,
        product_brand,
        RAM,
        ROM,
        back_cam,
        front_cam,
        display,
        processor,
        discount,
        product_img,
    } = request.body
    pool.query(
        'UPDATE products SET product_name = $2,product_price = $3,product_brand=$4,"RAM"=$5,"ROM"=$6,back_cam=$7,front_cam=$8,display=$9,processor=$10,discount=$11,product_img=$12 WHERE product_id = $1',
        [product_id, product_name,product_price, product_brand,RAM,ROM,back_cam,front_cam,display,processor,discount,product_img],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${results.product_id}`)
        }
    )
}
const deleteProduct  = (request, response) => {
    const product_id = parseInt(request.params.id)
    pool.query('DELETE FROM products WHERE product_id = $1', [product_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${product_id}`)
    })
}
module.exports = {
    getProduct ,
    getProductById,
    createProduct ,
    updateProduct ,
    deleteProduct ,
}