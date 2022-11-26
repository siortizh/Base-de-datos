const express = require('express');
const router = express.Router();

const productsModels = require("../models/products");



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
    productsModels
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
    productsModels
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
    productsModels
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
    productsModels
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
    productsModels
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

//operaciones Carrito
//------------------------------------------------------------------------------------

// http://localhost:3000/Kart/Createkart/:CustomerId
router.post("/Kart/CreateKart/:CustomerId", function (req, res, next) {
    const { confirmation } = req.body;
    if (!confirmation) {
      return res.status(500).send("No confirmaste la creacion del carrito");
    } else {
      productsModels.createKart(req.params.CustomerId, confirmation);
      return res.send({ message: `Carrito Creado!` });
    }
  });
  
  
  // http://localhost:3000/Kart/ProductInsert/:CustomerKartId
  router.post("/Kart/ProductInsert/:CustomerKartId", function (req, res, next) {
    const { Product, Quantity } = req.body;
    if (!Product || !Quantity) {
      return res.status(500).send("No agregaste el producto o la cantidad");
    } else {
      productsModels.ProductInsert(req.params.CustomerKartId, Product, Quantity);
      return res.send({ message: `Producto Agregado!` });
    }
  });
  
  
  //http://localhost:3000/Kart/UpdateQuantity/:CustomerKartId
  router.put("/Kart/UpdateQuantity/:CustomerKartId", function (req, res, next) {
    const { Quantity, ProductId } = req.body;
    productsModels
      .UpdateQuantity(Quantity, ProductId, req.params.CustomerKartId)
      .then(() => {
        res.send({ message: `Cantidad Actualizada!!` });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  });
  
  
  //http://localhost:3000/Kart/DeleteProduct/:CustomerKartId 
  router.delete("/Kart/DeleteProduct/:CustomerKartId", function (req, res, next) {
    const { ProductId } = req.body;
    productsModels
      .DeleteProduct(ProductId, req.params.CustomerKartId)
      .then(() => {
        res.send({ message: `Producto Eliminado!` });
      })
      .catch((err) => {
        return res.status(500).send("Error eliminando");
      });
  });
  
  
  //http://localhost:3000/Kart/MakePurchase1/:CustomerKartId
  router.post("/Kart/MakePurchase1/:CustomerKartId", function (req, res, next) {
    const { CustomerId, direction_delivery, mail_order } = req.body;
    if (!CustomerId || !direction_delivery || !mail_order) {
      return res.status(500).send("No agregaste algun campo requerido");
    } else {
      productsModels.MakePurchase1(CustomerId, direction_delivery, mail_order);
      productsModels.MakePurchase2(req.params.CustomerKartId);
      return res.send({ message: `Operacion exitosa!!` });
    }
  });
  
  
  // http://localhost:3000/Kart/ConsultKart/:CustomerKartId
  router.get("/Kart/consultKart/:CustomerKartId", async (req, res) => {
    try {
      const products = await productsModels.GetKart(req.params.CustomerKartId);
      res.send(products);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  
  //http://localhost:3000/Kart/ConsultOrder/:CustomerId
  router.get("/Kart/ConsultOrder/:CustomerId", async (req, res) => {
    try {
      const products = await productsModels.GetOrder(req.params.CustomerId);
      res.send(products);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  //http://localhost:3000/Kart/GetCustomerKart
  router.get("/Kart/GetCustomerKart", async (req, res) => {
    try {
      const results = await productsModels.GetCustomerKart();
      res.send(results);
    } catch (error) {
      response.status(500).send(error);
    }
});
module.exports = router;
