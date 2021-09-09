const express = require('express');
const ejs = require('ejs');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const app = express();

app.get('/getproducts', (req, res) => {
    const getProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            let result = response.data.slice(0, 10);
            res.render('index.ejs', { data: result });
        }
        catch (error) {
            console.error(error);
        }
    }
    getProducts();
})

app.get('/addProduct', (req, res) => {
    res.render('addProduct.ejs');
})

let products = [];

app.post('/postProducts', async (req, res) => {
    let newProduct = {
        "id": parseInt(req.body.id),
        "title": req.body.title,
        "price": parseFloat(req.body.price),
        "description": req.body.desc,
        "category": req.body.category,
        "image": req.body.image,
        "rating": {
            "rate": parseFloat(req.body.rate),
            "count": parseInt(req.body.count)
        }
    }
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        result = bodyParser.json(response.data.slice(0, 10));
        products = [...result];
        products.push(newProduct);
        // res.render('index.ejs', { data: result })
        console.log(products);
    }
    catch (error) {
        console.error(error);
    }
})

app.listen(5000, function () {
    console.log('server is up on 5000');
})