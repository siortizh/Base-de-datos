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
}