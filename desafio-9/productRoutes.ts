import express = require("express");
const app = express();
const router = express.Router()

let products : any[] = [], counterId = 256;

router.get('/', ((req, res) => {

    if(products.length == 0){
        let errorObjects = {
            error: "No hay productos cargados"
        }
        res.send(errorObjects)
    }

    res.json(products)
}))


router.post('/', ((req, res) => {
    const {title, price, thumbnail} = req.body
    const product = {
        id: `${counterId++}`,
        title,
        price,
        thumbnail
    }
    products.push(product)
    res.sendStatus(201)
}))

router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = products.find(product => product.id === id)
    if(!product){
        let errorObject = {
            error: "producto no encontrado"
        }
        //res.send(import(importProducts).then((e) => e.errorNotFound))
        res.send(errorObject)
    }
    res.json(product)
})

router.patch('/:id/price', (req, res) => {
    const id = req.params.id
    const product = products.find(product => product.id === id)
    if(!product){
        res.sendStatus(404)
    }

    const { price } = req.body
    product.price = price
    res.sendStatus(204)

})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const product = products.find(product => product.id === id)
    if(!product){
        res.sendStatus(404)
    }

    products = products.filter( product => product.id !== id)
    res.sendStatus(200)
})

module.exports = router