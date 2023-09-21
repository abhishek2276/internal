const express = require('express')
const pg = require('pg')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const db = require('./login1')
const db1 = require('./product1')
const db2=require('./cart1')
const db3=require('./fashion')
const port = 9000
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true, 
    })
)

  // Increase maximum header size
  app.set('maxHeaderSize', 65536); 
  async function getitems(){
    const client = new pg.Client({
        host: 'localhost',
        port: 5432,
        database: 'login',
        user: 'postgres',
        password: 'Abhi@2001',
      })
      await client.connect()
 
     let res = await client.query('select * from main')
      console.log(res);
      await client.end()
      return res.rows 


    }
    app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
    app.use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
      
        next();
      });
      


app.get("/",cors(),async (req,res)=>{
    const data = await getitems()
    console.log("all the details");
     res.send(data)

})

// Assuming you are using Express.js
// app.post('/users', (req, res) => {
//   const { name,email, password } = req.body;

//   // Perform authentication logic here and check if the user's credentials are valid

//   if (isValidUser) {
//     // If the user is valid, return a JSON response with a success message
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     // If the user is invalid, return a JSON response with an error message
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// });

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)  
app.post('/users/', db.createUser)
app.put('/users/:id', db.updateUser) 
app.delete('/users/:id', db.deleteUser)  
app.get('/products', db1.getProduct)   
app.get('/products/:id', db1.getProductById)   
app.post('/products/', db1.createProduct)    
app.put('/products/:id', db1.updateProduct)   
app.delete('/products/:id', db1.deleteProduct)
app.get('/cart', db2.getCart) 
app.get('/cart/:id', db2.getCartById)
app.post('/cart/', db2.addCart)
app.put('/cart/:id', db2.updateCart)  
app.delete('/cart/:id', db2.deleteCart) 
app.get('/fashion', db3.getFashion)
app.get('/fashion/:id', db3.getFashionById)
app.post('/fashion/', db3.createFashion) 
app.put('/fashion/:id', db3.updateFashion) 
app.delete('/fashion/:id', db3.deleteFashion)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})   