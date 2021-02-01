const fs = require("fs")
const express = require("express")
const casual = require("casual")
const app = express()
app.use(express.json())

const PORT = 8070;


let products = JSON.parse(fs.readFileSync("./products.txt", "utf-8"))


let arrProdName = products.map(e => e.product).toString()

let countItems = 0
let countRandom = 0

app.get('/items', ((req, res) => {

    res.send({
        items: arrProdName,
        cantidad: arrProdName.split(',').length
    })
    countItems++
}))

app.get('/items-random', ((req, res) => {

    res.send({
        item: arrProdName.split(',')[Math.floor(Math.random() * arrProdName.split(',').length)]
    })
    countRandom++
}))

app.get('/visitas', ((req, res) => {

    res.send({
        visitas: {
            items: countItems,
            item: countRandom
        }
    })
}))

const server = app.listen(`${PORT}`, () => {
    console.log("server up")
})
server.on("error", error => console.log(`Error de tipo "${error}" en el servidor`))