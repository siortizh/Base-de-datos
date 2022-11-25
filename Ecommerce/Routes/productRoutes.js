const express = require("express");
const productModel = require("../models/product");
const app = express();

// Consult all products
// URI: /products
app.get("/", async (request, response) => {
  const products = await productModel.find({});

  try {
    response.send(products);
  } catch (error) {
    response.status(500).send(error);
  }
});

// insert 
// URI: /products/insert
app.post("/insert", async (request, response) => {
    const product = new productModel(request.body);
  
    try {
      await product.save();
      response.send(product);
    } catch (error) {
      response.status(500).send(error);
    }
  });


// update
// URI: /products/update/{id}
app.patch("/update/:id", async (request, response) => {
    try {
      await productModel.findByIdAndUpdate(request.params.id, request.body);
      await productModel.save();
      response.send(product);
    } catch (error) {
      response.status(500).send(error);
    }
  });

// delete
// URI: /products/delete/{id}
app.delete("/delete/:id", async (request, response) => {
    try {
      const product = await productModel.findByIdAndDelete(request.params.id);
  
      if (!product) response.status(404).send("Product not found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = app;