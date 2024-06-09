-- Base de datos para PostgreSQL

CREATE TABLE USUARIOS (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    contrasena VARCHAR(255) NOT NULL
);
 
CREATE TABLE RESERVAS (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    codigo_reserva INT NOT NULL,
    dni VARCHAR(10) NOT NULL,
    matricula_vehiculo VARCHAR(10),
    numero_personas INT NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);