const { response } = require('express')

const Pool=require('pg').Pool
const pool=new Pool({
     host: 'localhost',
        port: 5432,
        database: 'login',
        user: 'postgres',
        password: 'Abhi@2001',
})

const getCart=(request,response)=>{
    pool.query('select * from cart ',(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getCartById=(request,respose)=>{
    const product_id = parseInt(request.params.id)
    pool.query('select * from cart where product_id=$1',[product_id],(error,results)=>{
        if(error){
            throw error
        }
        respose.status(200).json(results.rows)
    })
}
const addCart=(request,response)=>{
   const { 
    product_id,
    product_name, 
    product_price,
    product_brand,
    RAM,
    ROM,

    discount, 
    product_img,
   }=request.body
   pool.query('insert into cart (product_id, product_name,product_price, product_brand,"RAM","ROM",discount,product_img) values($1,$2,$3,$4,$5,$6,$7,$8)',[product_id, product_name,product_price, product_brand,RAM,ROM,discount,product_img],(error,results)=>{
    if(error){
        throw error
    }
    response.status(200).send(`cart product add with id:${results.insertProduct_id}`)
   })
}
const updateCart=(request,response)=>{
    const product_id=parseInt(request.params.id)
    const{ 
        product_name,
        product_price,
        product_brand,
        RAM,
        ROM,
    
        discount,
        product_img,
    }=request.body
    pool.query('update cart set product_name = $2,product_price = $3,product_brand=$4,"RAM"=$5,"ROM"=$6,discount=$7,product_img=$8 where product_id=$1',[product_id, product_name,product_price, product_brand,RAM,ROM,discount,product_img],(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).send(`cart updated with id:${product_id}`) 
       })
}
const deleteCart=(request,response)=>{
    const product_id=parseInt(request.params.id)
    pool.query('DELETE FROM cart WHERE product_id = $1',[product_id],(error,results)=>
    {
        if(error){ 
            throw error
        }
        response.status(200).send(`product deleted from cart with id:${product_id}`)
    })
}
module.exports = {
    getCart,
    getCartById,
    addCart,
    updateCart,
    deleteCart,
}