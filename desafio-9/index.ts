import express = require("express");

//Using express and router
const app = express();
const router = express.Router()

//Setting necessities for app
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true})) //Esta parte del código sirve para parsear el contenido que recibo

//Setting routes
app.use('/api', router)//Uso de router
app.use('/api/products', require('./productRoutes'))//Usar router importando rutas desde otro archivo

//Stablish main route
app.get('/api', (req, res) => {

    res.send("Ruta principal")

})

//Setting server path
const server = app.listen('3335', () => {
    console.log(`Running port 3335`)
})