CREATE DATABASE Diseño_fisico;

USE Diseño_fisico;

CREATE TABLE IF NOT EXISTS Cliente (
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    password VARCHAR(20),
    direccion VARCHAR(100) NOT NULL,
    pais VARCHAR(50),
    ciudad VARCHAR(50),
    telefono INT
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS Producto (
	id_producto INT AUTO_INCREMENT PRIMARY KEY,
    sku INT NOT NULL,
    nombre_producto VARCHAR(100),
    precio INT,
    descripcion VARCHAR(500),
    categoria VARCHAR (100),
    stock INT
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS Seccion (
	id_seccion INT AUTO_INCREMENT PRIMARY KEY,
    nombre_seccion VARCHAR(100),
    descripcion_seccion VARCHAR(500)
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS producto_seccion (
	id_producto_seccion INT AUTO_INCREMENT,
	id_producto INT,
    id_seccion INT,
    PRIMARY KEY (id_producto_seccion , id_producto , id_seccion),
	FOREIGN KEY (id_producto)
		REFERENCES Producto (id_producto)
		ON UPDATE RESTRICT ON DELETE CASCADE,
	FOREIGN KEY (id_seccion)
		REFERENCES 	Seccion (id_seccion)
		ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Carrito (
	id_carrito INT AUTO_INCREMENT,
	id_orden INT,
	id_producto INT,
	precio_total INT,
	cantidad INT,
	PRIMARY KEY (id_carrito , id_orden , id_producto),
	FOREIGN KEY (id_orden)
			REFERENCES Orden (id_orden)
			ON UPDATE RESTRICT ON DELETE CASCADE,
	FOREIGN KEY (id_producto)
			REFERENCES Producto (id_producto)
			ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Orden (
	id_orden  INT AUTO_INCREMENT,
    id_cliente INT,
    cantidad INT,
    direccion_entrega VARCHAR(100),
    fecha INT,
    estado VARCHAR(50),
    medio_pago VARCHAR(50),
    PRIMARY KEY (id_orden , id_cliente),
    FOREIGN KEY (id_cliente)
		REFERENCES Cliente (id_cliente)
		ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Registro_Orden (
id_registro_orden INT AUTO_INCREMENT PRIMARY KEY,
id_orden INT,
cantidad_ordenes INT
);
