DROP DATABASE Mocositos;
CREATE DATABASE Mocositos;
USE Mocositos;

CREATE TABLE Usuario(
    idUsuario   int auto_increment,
    email       VARCHAR(50)  NOT NULL ,
    contraseña  VARCHAR(100) NOT NULL,
    tipo        VARCHAR(100) NOT NULL,
    active      int NOT NULL,
    PRIMARY KEY (idUsuario)
)ENGINE=InnoDB;

CREATE TABLE Persona(
    idPersona   int auto_increment,
    nombre      VARCHAR(50) NOT NULL,
    app         VARCHAR(50) NOT NULL,
    apm         VARCHAR(50) NOT NULL,
    telefono    VARCHAR(10) NOT NULL,
    PRIMARY KEY (idPersona)
)ENGINE=InnoDB;

CREATE TABLE Direccion(
    idDireccion int auto_increment,
    calle       VARCHAR(50) NOT NULL,
    inte        VARCHAR(2) ,
    exte        VARCHAR(2),
    colonia     VARCHAR(50) NOT NULL,
    municipio   VARCHAR(50) NOT NULL,
    estado      VARCHAR(50) NOT NULL,
    cp          VARCHAR(5)  NOT NULL,
    PRIMARY KEY (idDireccion)
)ENGINE=InnoDB;

CREATE TABLE UnionPD(
    persona     int NOT NULL,
    direccion   int NOT NULL,
    FOREIGN KEY (persona) REFERENCES Persona(idPersona),
    FOREIGN KEY (direccion) REFERENCES Direccion(idDireccion)
)ENGINE=InnoDB;

CREATE TABLE Medico(
    idMedico            int auto_increment,
    rfc                 VARCHAR(13) NOT NULL,
    curp                VARCHAR(18) NOT NULL ,
    cedulaProfesional   VARCHAR(50) NOT NULL,
    especialidad        VARCHAR(50) NOT NULL,
    persona             int NOT NULL,
    usuario             int NOT NULL,
    PRIMARY KEY (idMedico),
    FOREIGN KEY (persona) REFERENCES Persona(idPersona),
    FOREIGN KEY (usuario) REFERENCES Usuario(idUsuario)
)ENGINE=InnoDB;

CREATE TABLE Paciente(
    idPaciente      int auto_increment,
    altura          DECIMAL NOT NULL,
    peso            DECIMAL NOT NULL,
    genero          VARCHAR(2) NOT NULL,
    edad            int NOT NULL,
    persona         int NOT NULL,
    PRIMARY KEY (idPaciente),
    FOREIGN KEY (persona) REFERENCES Persona(idPersona)
)ENGINE=InnoDB;


CREATE TABLE Cita(
    idCita      int auto_increment,
    horario     datetime NOT NULL,
    paciente    int NOT NULL,
    solicitante int NOT NULL,
    tecnico     int NOT NULL,
    PRIMARY KEY (idCita),
    FOREIGN KEY (paciente) REFERENCES Paciente(idPaciente),
    FOREIGN KEY (solicitante) REFERENCES Medico(idMedico),
    FOREIGN KEY (tecnico) REFERENCES Medico(idMedico)
)ENGINE=InnoDB;

CREATE TABLE Antigeno(
    idAntigeno  int auto_increment,
    comun       VARCHAR(50) NOT NULL,
    cientifico  VARCHAR(50) NOT NULL,
    PRIMARY KEY (idAntigeno)
)ENGINE=InnoDB;

CREATE TABLE Prueba(
    idPrueba    int auto_increment,
    score1      int NOT NULL,
    score2      int NOT NULL,
    antigeno    int NOT NULL,
    PRIMARY KEY (idPrueba),
    FOREIGN KEY (antigeno) REFERENCES Antigeno(idAntigeno)
)ENGINE=InnoDB;

CREATE TABLE Estudio(
    idEstudio       int auto_increment,
    conclusiones    VARCHAR(200) NOT NULL,
    cita            int NOT NULL,
    PRIMARY KEY (idEstudio),
    FOREIGN KEY (cita) REFERENCES Cita(idCita)
)ENGINE=InnoDB;

CREATE TABLE UnionEP(
    estudio int NOT NULL,
    prueba  int NOT NULL,
    FOREIGN KEY (estudio) REFERENCES Estudio(idEstudio),
    FOREIGN KEY (prueba) REFERENCES Prueba(idPrueba)
)ENGINE=InnoDB;


CREATE TABLE PDF(
    idPDF       int auto_increment,
    direccion   VARCHAR(100) NOT NULL,
    estudio     int,
    PRIMARY KEY (idPDF),
    FOREIGN KEY (estudio) REFERENCES Estudio(idEstudio)
);

INSERT INTO Antigeno(comun,cientifico)VALUES 
('Cereales','Triticum aestivum'),
('Frutas rosaceas','Malus domestica'),
('Huevo','Gallus domesticus'),
('Leche','Bos domesticus'),
('Pescado','Gadus callarias'),
('Acaros de polvo','Dermatophagoides farinae'),
('Acaros de polvo','Dermatophagoides pteronyssinus'),
('Acaros de polvo','Lepidoglyphus'),
('Animales','Canis familiaris(Epitelio de perro)'),
('Animales','Canis familiraris(Orina de perro)'),
('Animales','Equus caballus'),
('Animales','Felis domesticus'),
('Hongo de podredumbre','Alternaria alternata'),
('Polen de artemisa','Artemisia vulgarias'),
('Abedul','Betula verrucosa'),
('Olivio','Olea europaea'),
('Parietaria','Parietaria judaica'),
('Gramineas','Pheleum pratense'),
('Platano','Platanus acerifolia'),
('Salsola','Salsola kali');