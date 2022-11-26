var Customer = require('../models/customer');



//Save to database
function saveCustomer(req, res){  

var customer = new Customer(); 
var data = req.body;
    
if(data.name){
             
            
    customer.name = data.name;
    customer.email = data.email;

            
    customer.save((err, customerStored) => {

                    
        if(err) return res.status(500).send({message: 'Server error'});
         
                    
        if(customerStored){
                return res.status(200).send({
                    customer: customerStored
                });
        }else{
                return res.status(200).send({
                    message: 'Customer not saved'
                });
        }
         
    });
}else{
    return res.status(200).send({
            message: 'Customer name is required'
        });
}
}



// Read customer list
function getCustomers(req, res){
    
Customer.find({}).sort({'_id':-1}).exec((err, customers) => {
    if(err) return res.status(500).send({message: 'Server error'});
                 
        if(customers){
            return res.status(200).send({
                customers
            });
        }else{
            return res.status(404).send({
                message: 'No customers'
            });
        }
     
});
}



//Search for a customer by ID
function getCustomer(req, res){

var customerId = req.data.id;

Customer.findById(customerId).exec((err, customer) => {
    if(err) return res.status(500).send({ message: 'Server error' });

        if(customer){
            return res.status(200).send({
                customer
            });
        }else{
            return res.status(404).send({
                message: 'No customer found with this id'
            });
        }
     
});
}



//Update
function updateCustomer(req, res){

var customerId = req.data.id;
var update = req.body;

Customer.findByIdAndUpdate(customerId, update, {new:true}, (err, customerUpdated) => {
    if(err) return res.status(500).send({message: 'Server error'});
     
        if(customerUpdated){
            return res.status(200).send({
                customer: customerUpdated
            });
        }else{
            return res.status(404).send({
                message: 'No customer found with this id'
            });
        }
     
});
}


//Delete
function deleteCustomer(req, res){
    var customerId = req.params.id;
 
        // Buscamos por ID, eliminamos el objeto y devolvemos el objeto borrado en un JSON
    Customer.findByIdAndRemove(customerId, (err, customerRemoved) => {
        if(err) return res.status(500).send({ message: 'Server error' });
         
            if(customerRemoved){
                return res.status(200).send({
                    customer: notacustomerRemoved
                });
            }else{
                return res.status(404).send({
                    message: 'No customer found with this id'
                });
            }
         
    });
}



//Export methods
module.exports = {
    saveCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};
