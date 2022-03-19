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
    altura          DECIMAL(4,2) NOT NULL,
    peso            DECIMAL(4,2) NOT NULL,
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
    active      BOOLEAN NOT NULL,
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
('Polen de gramineas','Poaceae'),
('Maleza','Polygonum convolvulus'),
('Polen de ambrosia','Ambrosia coronopifolia'),
('Polen de amarantaceas','Quenopodiaceas-Amarantaceas'),
('Urticaceas','Urticaceae'),
('Hierba caracolera','Parietaria judaica '),
('Bet v 1 Abedul blanco','Betula verrucosa'),
('Ole e 1','Olea europaea'),
('Polen del plátano de sombra','Platanus acerifolia'),
('Acaro se polvo','Pyroglyphidae'),
('Der f 2 Ácaro americano','Dermatophagoides farinae'),
('Acaro de productos almacenados','Glycyphagidae'),
('Fel d 1','Proteína del epitelio del Felis domesticus'),
('Can f 1 para Canis familiaris','lipocalina de Canis familiaris'),
('Can f 5 Orina de perro','Arginina esterasa, calicreína prostática'),
('Epitelio de caballo Equ c 1','Lipocalina de Equus caballus'),
('Hámster siberiano','Proteína del epitelio del Phodopus sungorus'),
('Ory c 1','lipocalinas de Oryctolagus cuniculus'),
('Ory c 4','secretoglobina de Oryctolagus cuniculus'),
('Gal d 5',' alfa-livetina o albúmina sérica del pollo'),
('Huron','albumina de Mustela putorios furo'),
('Alt a 1 Hongo','Alternaria alternata'),
('Hongos domésticos','Aspergillus fumigatus'),
('Hongo del exterior','Cladosporium Alimentarios'),
('Camarones','tropomiosina'),
('Crangon crangon','arginina cinasa'),
('Bos d 8','Caseina'),
('Bos d 10','Alpha s2-Caseina'),
('Bos d 12','Kappa-Caseina '),
('Bos d 4','Alfa-Lactoalbumina'),
('Bos d 6','Seroalbumina'),
('Len c 1','vicilina de lens sculenta'),
('Len c 2 ','Proteina biotinilada de pisum sativum'),
('Ara ha 1','Vicilina arachis hypogaea'),
('Gly m 3','Profilina de polen de abedul'),
('Ara ha 3','Glicinina de arachis hypogaea'),
('Lup an 1',' Conglutinina del cacahuate'),
('Globulina 11S','Glivinina de glycine max'),
('Clu h 1','Beta- Parvalbumin de clupea harengus'),
('Sar sa 1','Beta- Parvalbumin de Sardinops'),
('Gad m 2','Enolase de gadus morhus'),
('Gad m 3','Aldolase de gadus morhus'),
('Thun a 1','Beta- Parvalbumin de thunnus albacares'),
('Thun a 2','Enolase de thunnus albacares'),
('Lep w 1','Lepidorhombus whiffiagonis'),
('Onk k 5','Viteliogenin'),
('Sal s 1','Enolase de salmo salar 48. seb m 1'),
('Cucaracha negra','Blatella germanica'),
('Cucaracha europea','Blatta Orientalis'),
('Cucaracha roja Americana','Periplaneta Americana'),
('Har a 1 - Mariquita asiática','Harmonia axyridis'),
('Chinche hedionda','Pentatomidae'),
('Mus m 1','lipocalina y Epitelio de Mus musculus Por contacto'),
('Guantes de goma','MBTA y tiuram'),
('Cremas hidratantes',' Kathon CG y Euxyl K400'),
('Cosmeticos capilates','parafenilendiamia'),
('Cosmeticos','conservantes'),
('Laca de uñas','Resina de foluensulfonamida'),
('Hev b 6 Latex','proheveina'),
('Hev b3','Biosíntesis y poliisoprenos');