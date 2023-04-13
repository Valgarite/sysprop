/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: articulo
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `articulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(4) NOT NULL,
  `categoriaId` int(11) DEFAULT NULL,
  `nombre` varchar(80) NOT NULL,
  `precio` decimal(8, 2) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK_10fae2f5cded8e3ce09695dccd6` (`categoriaId`),
  CONSTRAINT `FK_10fae2f5cded8e3ce09695dccd6` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cargo
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cargo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categoria
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cliente
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: compras
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `idusuarioId` int(11) DEFAULT NULL,
  `idproveedorId` int(11) DEFAULT NULL,
  `total` decimal(8, 2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_108d9c8a3ba60b575b826e36144` (`idusuarioId`),
  KEY `FK_5f92d9ec921bd1a910d5ffdb13a` (`idproveedorId`),
  CONSTRAINT `FK_108d9c8a3ba60b575b826e36144` FOREIGN KEY (`idusuarioId`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_5f92d9ec921bd1a910d5ffdb13a` FOREIGN KEY (`idproveedorId`) REFERENCES `proveedor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proveedor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proveedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `rif` varchar(16) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `correo` varchar(50) NOT NULL DEFAULT 'NO',
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: union_compra_articulos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `union_compra_articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `articuloId` int(11) DEFAULT NULL,
  `compraId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4bd8c3a04e5c7299b8e265f9a4b` (`articuloId`),
  KEY `FK_5309084d13ccecb8279f06c770a` (`compraId`),
  CONSTRAINT `FK_4bd8c3a04e5c7299b8e265f9a4b` FOREIGN KEY (`articuloId`) REFERENCES `articulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_5309084d13ccecb8279f06c770a` FOREIGN KEY (`compraId`) REFERENCES `compras` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: union_venta_articulos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `union_venta_articulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `articuloId` int(11) DEFAULT NULL,
  `ventaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f11f1c498f470236d3adc6b4ccc` (`articuloId`),
  KEY `FK_d34b5a1b4c13dd003edb7243eb9` (`ventaId`),
  CONSTRAINT `FK_d34b5a1b4c13dd003edb7243eb9` FOREIGN KEY (`ventaId`) REFERENCES `ventas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f11f1c498f470236d3adc6b4ccc` FOREIGN KEY (`articuloId`) REFERENCES `articulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cargoId` int(11) DEFAULT NULL,
  `cedula` varchar(13) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `username` varchar(25) NOT NULL,
  `estado_activo` tinyint(4) NOT NULL DEFAULT 1,
  `fechaNacimiento` date NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7db14c51775d26f3fdbd0a88cde` (`cargoId`),
  CONSTRAINT `FK_7db14c51775d26f3fdbd0a88cde` FOREIGN KEY (`cargoId`) REFERENCES `cargo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ventas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `idusuarioId` int(11) DEFAULT NULL,
  `idclienteId` int(11) DEFAULT NULL,
  `total` decimal(8, 2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0d73bb275ffaae557956bfd8d39` (`idusuarioId`),
  KEY `FK_cfec38fd11a4cfeafa938747165` (`idclienteId`),
  CONSTRAINT `FK_0d73bb275ffaae557956bfd8d39` FOREIGN KEY (`idusuarioId`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cfec38fd11a4cfeafa938747165` FOREIGN KEY (`idclienteId`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: articulo
# ------------------------------------------------------------

INSERT INTO
  `articulo` (
    `id`,
    `cantidad`,
    `categoriaId`,
    `nombre`,
    `precio`,
    `estado_activo`
  )
VALUES
  (3, 9645, 1, 'Tina pequeña', 12345.12, 1);
INSERT INTO
  `articulo` (
    `id`,
    `cantidad`,
    `categoriaId`,
    `nombre`,
    `precio`,
    `estado_activo`
  )
VALUES
  (5, 7, 1, 'Tina mediana', 100.00, 1);
INSERT INTO
  `articulo` (
    `id`,
    `cantidad`,
    `categoriaId`,
    `nombre`,
    `precio`,
    `estado_activo`
  )
VALUES
  (6, 0, 1, 'string', 0.00, 1);
INSERT INTO
  `articulo` (
    `id`,
    `cantidad`,
    `categoriaId`,
    `nombre`,
    `precio`,
    `estado_activo`
  )
VALUES
  (7, 30, 1, 'nuevo', 10.00, 1);
INSERT INTO
  `articulo` (
    `id`,
    `cantidad`,
    `categoriaId`,
    `nombre`,
    `precio`,
    `estado_activo`
  )
VALUES
  (8, 150, 1, 'prueba', 5.00, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cargo
# ------------------------------------------------------------

INSERT INTO
  `cargo` (`id`, `nombre`)
VALUES
  (1, 'Empleado');
INSERT INTO
  `cargo` (`id`, `nombre`)
VALUES
  (2, 'Administrador');
INSERT INTO
  `cargo` (`id`, `nombre`)
VALUES
  (3, 'Gerente');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categoria
# ------------------------------------------------------------

INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (1, 'Tinas');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cliente
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: compras
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proveedor
# ------------------------------------------------------------

INSERT INTO
  `proveedor` (
    `id`,
    `nombre`,
    `rif`,
    `telefono`,
    `direccion`,
    `correo`,
    `estado_activo`
  )
VALUES
  (1, 'asda', 'asd', 'asd', 'asd', 'asd', 1);
INSERT INTO
  `proveedor` (
    `id`,
    `nombre`,
    `rif`,
    `telefono`,
    `direccion`,
    `correo`,
    `estado_activo`
  )
VALUES
  (2, '234', '', '123', '123', 'NO', 1);
INSERT INTO
  `proveedor` (
    `id`,
    `nombre`,
    `rif`,
    `telefono`,
    `direccion`,
    `correo`,
    `estado_activo`
  )
VALUES
  (4, '234', '', '123', '123', '123', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: union_compra_articulos
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: union_venta_articulos
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

INSERT INTO
  `usuario` (
    `id`,
    `cargoId`,
    `cedula`,
    `nombre`,
    `correo`,
    `username`,
    `estado_activo`,
    `fechaNacimiento`,
    `password`
  )
VALUES
  (
    16,
    3,
    '000000',
    'sysprop',
    'carlsgutierrez259@gmail.com',
    'admin',
    1,
    '2002-12-25',
    'zeus'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ventas
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
