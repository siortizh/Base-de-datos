const conection = require("../conection");

module.exports = {
    insert(name, price) {
        return new Promise((resolve, reject) => {
            conection.query(`insert into productos (name, price) values (?, ?)`,
                [name, price], (err, results) => {
                    if (err) reject(err);
                    else resolve(results.insertId);
                });
        });
    },
    read() {
        return new Promise((resolve, reject) => {
            conection.query(`select id, name, price from productos`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },
    readById(id) {
        return new Promise((resolve, reject) => {
            conection.query(`select id, name, price from productos where id = ?`,
                [id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },
    update(id, name, price) {
        return new Promise((resolve, reject) => {
            conection.query(`update products
            set name = ?,
            price = ?
            where id = ?`,
                [name, price, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            conection.query(`delete from products
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    
    
//Crear un nuevo carrito 
CreateKart(CustomerId, confirmation) {
  return new Promise((resolve, reject) => {
      conexion.query(`insert into CustomerKart(CustomerId,confirmation, estatus) values(?,?, "Purchasing") `,
          [CustomerId, confirmation], (err, results) => {
              if (err) reject(err);
              else resolve(results.insertId);
          });
  });
},

//agregar un producto al carrito
ProductInsert(CustomerId, ProductId, Quantity) {
  return new Promise((resolve, reject) => {
      conexion.query(`insert into carrito(CustomerKartId, ProductId, Quntity) values(?,?,?) `,
          [CustomerKartId, ProductId, Quantity], (err, results) => {
              if (err) reject(err);
              else resolve(results.insertId);
          });
  });
},

// actualizar cantidad de un producto en el carrito
UpdateQuantity(Quantity, ProductId, CustomerKartId) {
  return new Promise((resolve, reject) => {
      conexion.query(`update ecommerce.Kart
                      set Quantity = ?
                      where ProductId= ? and CustomerKartId = ?`,
          [Quantity, ProductId, CustomerKartId],
          (err) => {
              if (err) reject(err);
              else resolve();
          });
  });
},

// eliminar un producto del carrito
DeleteProduct(ProductId, CustomerKartId) {
  return new Promise((resolve, reject) => {
      conexion.query(`delete from ecommerce.Kart
  where  ProductId = ? and CustomerKartId= ?`,
          [ProductId, CustomerKartId],
          (err) => {
              if (err) reject(err);
              else resolve();
          });
  });
},

// primera parte para comprar/ordenar un carrito
MakePurchase1(CustomerId, direction_delivery, mail_order) {
  return new Promise((resolve, reject) => {
      conexion.query(`insert into orden (CustomerId, direction_delivery, mail_order, date_order, status_order) values (?,?,?, NOW(), "aceptada")`,
          [CustomerId, direction_delivery, mail_order],
          (err) => {
              if (err) reject(err);
              else resolve();
          });
  });
},


// consulta el carrito
ConsultKart(CustomerKartId) {
  return new Promise((resolve, reject) => {
      conexion.query(`select  KartID , ProductId, Quantity from Kart where CustomerKartId = ?`,
          [CustomerKartId],
          (err, results) => {
              if (err) reject(err);
              else resolve(results);
          });
  });
},

// consulta para hacer pruebas sobre una orden
ConsultOrder(CustomerId) {
  return new Promise((resolve, reject) => {
      conexion.query(`select * from order where CustomerId = ?`,
          [CustomerId],
          (err, results) => {
              if (err) reject(err);
              else resolve(results);
          });
  });
},


GetCustomerKart() {
  return new Promise((resolve, reject) => {
      conexion.query(`select * from CustomerKart`,
          (err, results) => {
              if (err) reject(err);
              else resolve(results);
          });
  });
},
}
