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
})

router.get('/pdf', (req,res)=>{
    res.render('pdf');
})


module.exports = router;