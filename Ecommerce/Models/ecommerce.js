const conection = require("../conection");

module.exports = {
    login(email,password) {
        return new Promise((resolve, reject) => {
            conection.query(`select id from customers where email = ? and password = ?`,
                [email,password],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },
    qorder(id_order) {
        return new Promise((resolve, reject) => {
            conection.query(`select * from orders where id = ?`,
                [id_order],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results[0]);
                });
        });
    },
    create_cart(id_customer) {
        return new Promise((resolve, reject) => {
            cart_date = new Date()
            conection.query(`insert into cart (id_customer, cart_date, statues) values (?, ?, 0)`,
                [id_customer,cart_date],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },
}