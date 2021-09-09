const express = require('express');
const ejs = require('ejs');
const axios = require('axios').default;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views","./views")
app.set("view engine","ejs");

let products = [];

app.get('/getproducts', (req, res) => {
    const getProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            let result = response.data.slice(0, 10);
            products = [...result];
            res.render('index.ejs', { data: products });
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

app.post('/postProduct', async (req, res) => {
    console.log(req.body.id);
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
        console.log(newProduct);
        const response = await axios.get('https://fakestoreapi.com/products');
        result = response.data.slice(0, 10);
        products = [...result];
        products.push(newProduct);
        console.log(newProduct);
        res.render('index.ejs', { data: products });
    }
    catch (error) {
        console.error(error);
    }
})

app.listen(5000, function () {
    console.log('server is up on 5000');
})