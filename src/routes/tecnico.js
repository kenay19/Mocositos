const express = require('express');
const router = express.Router();
const pool = require('../database');
const pdf = require('html-pdf');
const path = require('path');
const {autheticate} = require('../lib/helper');

router.get('/',autheticate , (req,res) => {
    res.render('tecnico');
});

router.get('/Estudy/:idCita',autheticate, (req,res) => {
    console.log('==================================')
    console.log('Estudy')
    console.log('==================================')
    res.render('estudio');
});

router.get('/getDates', async(req,res) => {
    const result = await pool.query('SELECT idPaciente,idCita,app,apm,nombre,horario FROM Cita,Usuario,Medico,Persona,Paciente WHERE Usuario.tipo="tecnico" AND Usuario.active=1 AND Medico.usuario=Usuario.idUsuario AND Cita.tecnico=Medico.idMedico  AND Paciente.idPaciente=Cita.paciente AND Persona.idPersona = Paciente.persona AND Cita.horario>='+ new Date().getTime()+' AND cita.active=1');
    res.json(result);
});

router.get('/getAntigenos', async (req, res) => {
    const result = await pool.query('SELECT * FROM Antigeno');
    res.json(result);
});

router.get('/pdf',autheticate, (req,res)=>{
    res.render('pdf');
});

router.post('/createEstudy' , async(req,res) => {
    const {conclusiones,antigeno,cita} = req.body;
    const antigenos = await pool.query('SELECT * FROM Antigeno');
    const result = await pool.query('INSERT INTO Estudio SET ?',[{conclusiones,cita}]);
    let prueba;
    for(let i = 1 ; i <= antigenos.length ; i++) {
        prueba = await pool.query('INSERT INTO Prueba SET ? ',[{score1: req.body[i],score2: conversion(req.body[i]),antigeno: i}]);
        await pool.query('INSERT INTO  UnionEP SET ?',[{estudio: result.insertId,prueba:prueba.insertId}]);
    }
    await pool.query('UPDATE Cita SET active=? WHERE idCita=?',[0,Number(cita)])
    res.json({
        idEstudio: result.insertId
    });

});

router.post('/pdf', async (req, res) => {
    const {idEstudio} = req.body;
    const pacient = await pool.query('SELECT nombre,app,apm,altura,peso,genero,edad FROM Estudio,Cita,Paciente,Persona WHERE Estudio.idEstudio = ? AND Cita.idCita = Estudio.cita AND Paciente.idPaciente = Cita.paciente  AND Persona.idPersona = Paciente.persona',[idEstudio]);
    const solicitante = await pool.query('SELECT nombre,app,apm FROM Estudio,Cita,Medico,Persona WHERE Estudio.idEstudio = ? AND Cita.idCita = Estudio.cita AND Medico.idMedico = Cita.solicitante   AND Persona.idPersona = Medico.persona',[idEstudio]);
    const tecnico = await pool.query('SELECT nombre,app,apm FROM Estudio,Cita,Medico,Persona WHERE Estudio.idEstudio = ? AND Cita.idCita = Estudio.cita AND Medico.idMedico = Cita.tecnico   AND Persona.idPersona = Medico.persona',[idEstudio]);
    const horario = await pool.query('SELECT Horario,Conclusiones FROM Estudio,Cita WHERE Estudio.idEstudio = ? AND Cita.idCita = Estudio.cita',[idEstudio]);
    const antigenos = await pool.query('SELECT comun,cientifico,score1,score2 FROM unionEp,prueba,antigeno WHERE unionEP.estudio = ? AND Prueba.idPrueba = unionEP.prueba AND antigeno.idAntigeno = prueba.antigeno',[idEstudio]);
    let json = {
        paciente:{
            nombre: pacient[0].nombre +" " +pacient[0].app + " " + pacient[0].apm,
            altura: pacient[0].altura,
            edad: pacient[0].edad,
            genero: pacient[0].genero,
            peso: pacient[0].peso,
            antigenos
        },
        solicitante: solicitante[0].nombre + " " + solicitante[0].app + " " + solicitante[0].apm,
        tecnico: tecnico[0].nombre + " " + tecnico[0].app + " " + tecnico[0].apm,
        horario: horario[0].Horario,
        conclusiones: horario[0].Conclusiones,
        antigenos
    }
    res.json(json);

});

router.post('/generator',  async(req, res) => {
    const {file,nombre,estudio} = req.body;
    pdf.create(file).toFile(path.join(__dirname, '../public/documents/'+nombre+'.pdf'), (err,result) => {
        if(err) {
            console.error(err);
        }else{
            console.log(result);
        }
    });
    const result = await pool.query('INSERT INTO Pdf SET ?',[{direccion: "/public/documents/"+nombre+".pdf",estudio}]);
    res.json({message: 'create pdf correctly'});
});

function conversion(score) {
    if (score >= 7 && score < 9) {
        return 3;
    }else if (score >= 9 && score <11) {
        return 4;
    }else if (score >= 11 && score <13) {
        return 5;
    }else if (score >= 13) {
        return 6;
    }else{
        return 0;
    }
}
module.exports = router;