# BASE DE DATOS
# Reto 3, 2022-2

CREATE DATABASE Ecommerce;

USE Ecommerce;

# CUSTOMER

CREATE TABLE IF NOT EXISTS Customer (
	CustomerId INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(20),
    name VARCHAR(100) NOT NULL,
    mail VARCHAR(100),
    phone INT,
    country VARCHAR(100),
    city VARCHAR(100),
    direction VARCHAR(200)
) ENGINE = INNODB;

# Insert customer records
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('789', 'LAURA',' LALI@GMAIL.COM', '305896241', 'Colombia', 'Medellín', 'Carrera 56A No. 51 - 81');	
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('456', 'MARIA',' MARIA@GMAIL.COM', '317894562', 'Colombia', 'Bogotá', 'Carrera 7A No. 32 - 63 piso 2');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('123', 'JUAN PABLO',' JUANPA@GMAIL.COM', '320584679', 'Canada', 'Otawa', '1093 Bay Street');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('741', 'ISABELA',' ISABELA@GMAIL.COM', '314602578', 'Brasil', 'Rio de Janeiro', 'Praça Mozar Firmeza 761');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('852', 'JUAN',' JUAN@GMAIL.COM', '0348952176', 'Estados Unidos', 'Washington', 'Carr. #3 Km 22.01-Barrio Cienaga Baja');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('963', 'SAMUEL',' SAMUEL@GMAIL.COM', '362587492', 'Colombia', 'Cali', 'CARRERA 42 No.5C-48 Barrio Tequendama');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('753', 'SOFIA',' SOFIA@GMAIL.COM', '305482631', 'Estados Unidos', 'New York', '251 West Route 59 Nanuet NY 10954');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('951', 'NICOLAS',' NICOLAS@GMAIL.COM', '314795864', 'Mexico', 'Ciudad de Mexico', 'BOSQUE DE BIRMANIA NO. 66, BOSQUES DE ARAGON, 57170');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('412', 'JERONIMO',' JERONIMO@GMAIL.COM', '325849621', 'Canada', 'Toronto', '50 Weir Crescent Ontairo');
INSERT INTO Customer (password, name, mail, phone, country, city, direction) VALUES ('896', 'SARA',' SARA@GMAIL.COM', '605487215', 'Colombia', 'Armenia', 'CALLE 23 No. 12-11');


CREATE TABLE IF NOT EXISTS Orders (
	id_orders  INT AUTO_INCREMENT PRIMARY KEY,
    CustomerId INT,
    quantity_products INT,
    direction_delivery VARCHAR(100),
    payment VARCHAR(50),
    delivery_date INT,
    mail_order VARCHAR(100),
    status VARCHAR(50),
    FOREIGN KEY (CustomerId)
			REFERENCES Customer (CustomerId)
			ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Order_details (
	id_order_details INT AUTO_INCREMENT,
	id_orders INT,
	ProductId INT,
	total_price INT,
	quantity_product INT,
	PRIMARY KEY (id_order_details , id_orders , ProductId),
	FOREIGN KEY (id_orders)
			REFERENCES Orders (id_orders)
			ON UPDATE RESTRICT ON DELETE CASCADE,
	FOREIGN KEY (ProductId)
			REFERENCES Product (ProductId)
			ON UPDATE RESTRICT ON DELETE CASCADE
);



# PRODUCT

CREATE TABLE IF NOT EXISTS Products (
	id_product INT AUTO_INCREMENT PRIMARY KEY,
    ProductId INT,
    product_name VARCHAR(100),
    product_price INT,
    product_description VARCHAR(500),
    stock INT
) ENGINE = INNODB;

# Insert Product records
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('0123456789012', 'Pijama', '60.000', 'conjunto de short y blusa', '30');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('881975913', 'Camiseta', '135.990', 'Camiseta polo Manga corta La Martina Hombre', '40');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('9722720', 'Celular', '2.649.900', 'iPhone 11 128 GB', '101');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('31642481', 'Figura de Animal', '349.900', 'Figura de Animal Jurassic World Thrash ¿N Devour Tyrannosaurus Rex', '111');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('32332778', 'Televisor', '1.799.900', 'Televisor Xiaomi 55 Pulgadas LED 4K Ultra HD Smart TV', '30');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('882429281', 'Perfume', '109.990', 'Perfume Mujer Mossimo Fragancia Mossimo By Daniela Ospina 100 Ml EDP', '1230');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('3442346', 'Colchón', '899.900', 'Colchón Sencillo Sensation Intermedio', '10');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('882073615', 'Jean', '109.900', 'Jean Slim Hombre Basement', '05');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('3858913', 'Camiseta', '329.990', 'Camiseta polo Hombre Manga corta Polo Ralph Lauren', '04');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('13566372', 'Neceser', '159.990', 'Neceser Wolf & Hank Cuero De Mano', '213');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('882525103', 'Sweater', '79.990', 'Sweater Newboat Mujer', '21');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('882497360', 'Chaqueta', '179.990', 'Chaqueta Mujer Newboat', '33');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('20925925', 'Chaqueta', '125.990', 'Chaqueta de jean Hombre Mossimo', '391');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('28666242', 'Jean', '69.990', 'Jean Algodón Mujer Wide Alto Doo Australia', '123');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('3827758', 'Perfume', '432.990', 'Perfume Carolina Herrera 212 Nyc Hombre 200 ml EDT', '321');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('19542212', 'Chaqueta', '84.990', 'Chaqueta Hombre Denimlab', '20');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('3628541', 'Perfume', '449.900', 'Perfume One Million Men EDT 200 ml', '10');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('882538215', 'Comedero', '349.990', 'Comedero Automático para Perro', '110');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('12069671', 'Bicicleta', '449.990', 'Bicicleta de montaña Hawk Mountain Gear 27.5 Pulgadas', '33');
INSERT INTO Product (ProductId, product_name, product_price, product_description, stock) VALUES ('29697311', 'Reloj', '299.990', 'Reloj Hombre Invicta Pro Diver', '323');


CREATE TABLE IF NOT EXISTS Product_category (
	id_product_category INT AUTO_INCREMENT PRIMARY KEY,
	ProductId INT,
    id_category INT,
	FOREIGN KEY (ProductId)
		REFERENCES Products (ProductId)
		ON UPDATE RESTRICT ON DELETE CASCADE,
	FOREIGN KEY (id_category)
		REFERENCES 	Category (id_category)
		ON UPDATE RESTRICT ON DELETE CASCADE
);


# CATEGORY

CREATE TABLE IF NOT EXISTS Category (
	id_category INT AUTO_INCREMENT,
    category_name VARCHAR(100),
    category_description VARCHAR(500)
) ENGINE = INNODB;

# Insert category records
INSERT INTO Category (category_name, category_description) VALUES ('Mujer', 'Ropa mujer, ropa interior y pijamas, vestidos de baño');
INSERT INTO Category (category_name, category_description) VALUES ('Hombre', 'Ropa hombre, Accesorios, Ropa Interior y pijamas');
INSERT INTO Category (category_name, category_description) VALUES ('Mascotas', 'Perros, Gatos, Otros animales');
INSERT INTO Category (category_name, category_description) VALUES ('Tecnologia', 'TV, Camaras, Audifonos, Parlantes, Gaming, Smartwatch, computadores,, Hogar Inteligente');
INSERT INTO Category (category_name, category_description) VALUES ('Electrodomesticos', 'Electro cocina, Electro hogar, Neveras, Lavadoras, Cocinas, Climatizacion, Cuidado personal');
INSERT INTO Category (category_name, category_description) VALUES ('Perfumes y belleza', 'Perfumes, Maquillaje, Cuidado facial, Cuidado capilar, Dermocosmetica');
INSERT INTO Category (category_name, category_description) VALUES ('Muebles', 'Sala, Exterior y terraza, Comedor, Dormitorio, Dormitorio infantil, estudio y oficina');
INSERT INTO Category (category_name, category_description) VALUES ('Zapatos', 'Tenis mujer, Tenis hombre, Tenis infantiles, Zapatos mujer, Zapatos hombre, Zapatos niña, Zapatos niño');
INSERT INTO Category (category_name, category_description) VALUES ('Dormitorio', 'Ropa de cama, Colchones, Complementos de cama, Tipos de camas, Muebles, Ropa de cama infantil, Ropa de cama juvenil, Habitacion para niños');
INSERT INTO Category (category_name, category_description) VALUES ('Celulares', 'Marcas, Accesorios, Warables');



CREATE TABLE IF NOT EXISTS Kart (
	KartId INT AUTO_INCREMENT PRIMARY KEY,
    id_orders INT,
    total_price INT,
	Quantity INT,
    PRIMARY KEY (KartId, id_orders),
	FOREIGN KEY (id_orders)
			REFERENCES Orders (id_orders)
			ON UPDATE RESTRICT ON DELETE CASCADE
) ENGINE = INNODB;

