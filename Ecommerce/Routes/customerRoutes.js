'use strict'
 
var express = require('express');
var customerController = require('../controllers/customer');
 
var api = express.Router();
 
// POST para guardar nuevos documentos
// U
api.post('/customer/create', customerController.saveCustomer);
 
// GET para conseguir documentos
api.get('/customer/read', customerController.getCustomers);
api.get('/customer/search/:id', customerController.getCustomer);
 
// PUT para actualizar documentos
api.put('/customer/update/:id', customerController.updateNota);
 
// DELETE para eliminar documentos
api.delete('/customer/delete/:id', customerController.deleteCustomer);
 
module.exports = api;
