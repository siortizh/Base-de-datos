const express = require('express');
const router = express.Router();

const productsModel = require("../models/products");



// Create
// URI: /products/create
router.get('/create', function (req, res, next) {
    res.render("products/create");
});
router.post('/insert', function (req, res, next) {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(500).send("No name or price");
    }
    productsModel
        .insertar(name, price)
        .then(idProductInsert => {
            res.redirect("/products");
        })
        .catch(err => {
            return res.status(500).send("Error creating product");
        });
});



// Read all products
// URI: /products/read
router.get('/', function (req, res, next) {
    productsModel
        .obtain()
        .then(products => {
            res.render("products/read", {
                products: products,
            });
        })
        .catch(err => {
            return res.status(500).send("Error getting products");
        });

});



//Update
// URI: /products/update/
router.post('/update/', function (req, res, next) {
    const { id, name, price } = req.body;
    if (!name || !price || !id) {
        return res.status(500).send("Not enough data");
    }
    productsModel
        .update(id, name, price)
        .then(() => {
            res.redirect("/products");
        })
        .catch(err => {
            return res.status(500).send("Error updating product");
        });
});



//Delete
// URI: /products/delete/{id}
router.get('/delete/:id', function (req, res, next) {
    productsModel
        .delete(req.params.id)
        .then(() => {
            res.redirect("/products");
        })
        .catch(err => {
            return res.status(500).send("Error deleting");
        });
});



//Consult
// URI: /products/consult/{id}
router.get('/consult/:id', function (req, res, next) {
    productsModel
        .obtainById(req.params.id)
        .then(product => {
            if (product) {
                res.render("products/consult", {
                    product: product,
                });
            } else {
                return res.status(500).send("No product found with this id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error getting product");
        });
});



module.exports = router;
