const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();
const pool = require('../database');

router.get('/' , (req,res) => {
    res.render('tecnico');
});

router.get('/Estudy', (req,res) => {
    res.render('estudio');
});

router.get('/getDates', async(req,res) => {
    const result = await pool.query('SELECT idPaciente,idCita,app,apm,nombre,horario FROM Cita,Usuario,Medico,Persona,Paciente WHERE Usuario.tipo="tecnico" AND Usuario.active=1 AND Medico.usuario=Usuario.idUsuario AND Cita.tecnico=Medico.idMedico  AND Paciente.idPaciente=Cita.paciente AND Persona.idPersona = Paciente.persona' );
    res.json(result);
});

router.get('/getAntigenos', async (req, res) => {
    const result = await pool.query('SELECT * FROM Antigeno');
    res.json(result);
});

router.get('/pdf', (req,res)=>{
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
    res.json({
        idEstudio: result.insertId
    });

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