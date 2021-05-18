-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para crudnode
CREATE DATABASE IF NOT EXISTS `crudnode` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `crudnode`;

-- Volcando estructura para tabla crudnode.casos
CREATE TABLE IF NOT EXISTS `casos` (
  `IdCasos` int(11) NOT NULL AUTO_INCREMENT,
  `confirmados` int(11) NOT NULL,
  `negativos` int(11) NOT NULL,
  `sospechosos` int(11) NOT NULL,
  `defunciones` int(11) NOT NULL,
  `recuperados` int(11) NOT NULL,
  `activos` int(11) NOT NULL,
  `fecha` varchar(50) NOT NULL DEFAULT '',
  `semaforo` varchar(50) NOT NULL,
  PRIMARY KEY (`IdCasos`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla crudnode.hospitales
CREATE TABLE IF NOT EXISTS `hospitales` (
  `IdHospital` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `nivelaten` varchar(50) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `cupos` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdHospital`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla crudnode.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `nombreU` varchar(100) DEFAULT NULL,
  `contraseña` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
