"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(express.json());
// let importProducts = require("products")
// app.use('/product', importProducts)
var products = [];
var counterId = 256;
app.get('/products', (function (req, res) {
    if (products.length == 0) {
        var errorObjects = {
            error: "No hay productos cargados"
        };
        res.send(errorObjects);
    }
    res.json(products);
}));
app.post('/products', (function (req, res) {
    var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
    var product = {
        id: "" + counterId++,
        title: title,
        price: price,
        thumbnail: thumbnail
    };
    products.push(product);
    res.sendStatus(201);
}));
app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    var product = products.find(function (product) { return product.id === id; });
    if (!product) {
        var errorObject = {
            error: "producto no encontrado"
        };
        res.send(errorObject);
    }
    res.json(product);
});
var server = app.listen('3335', function () {
    console.log("Running port 3335");
});
