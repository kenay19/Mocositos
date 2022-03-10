const express = require('express');
const router = express.Router();
const pool = require('../database');
/**
    Muestra la pagina principal del pediatra con los estudios ya realizados
*/
router.get('/' , async(req,res) => {
    const result = await pool.query('SELECT idPDF,nombre,app,apm,horario FROM Persona,Paciente,Cita,Estudio,PDF WHERE Persona.idPersona=Paciente.persona AND Cita.paciente=Paciente.idPaciente AND Estudio.cita = Cita.idCita AND PDF.estudio = Estudio.idEstudio');
    res.render('pediatra',{result});
});

router.post('/', async(req,res) => {
    const {nombre} = req.body;
    try {
        const result = await pool.query("SELECT idPDF,nombre,app,apm FROM Persona,Paciente,Cita,Estudio,PDF WHERE Persona.nombre LIKE '%"+nombre+"%' AND Persona.idPersona=Paciente.persona AND Cita.paciente=Paciente.idPaciente AND Estudio.cita = Cita.idCita AND PDF.estudio = Estudio.idEstudio");
        res.json(result);
    }catch (error) {
        console.log(error);
        res.json({
            message: 'Dont exist that pacient '
        });
    }
});

/**
    Muestra el formulario para agendar una cita
*/
router.get('/addPacient', (req,res) => {
    res.render('pacientForm');
});

/**
    Genera el nuevo paciente asi como la cita para el alergologo
*/
router.post('/addPacient' , async (req,res) => {
    const {altura,genero,peso,edad,nombre,app,apm,telefono,calle,inte,exte,colonia,municipio,estado,cp,horario,solicitante,tecnico} = req.body;
    let ids;
    try {
        result = await pool.query('INSERT INTO Persona SET ?',[{nombre,app,apm,telefono}]);
        if(result) {
            ids = { id1: result.insertId};
            result = await pool.query('INSERT INTO Direccion SET ?',[{calle,inte,exte,colonia,municipio,estado,cp}]);
            if(result) {
                ids.id3 = result.insertId;
                result = await pool.query('INSERT INTO UnionPD SET ?',[{persona: ids.id1,direccion:ids.id3}]);
                if(result) {
                    result = await pool.query('INSERT INTO Paciente SET ?',[{altura,peso,genero,persona:ids.id1,edad}]);
                    if(result) {
                        ids.id4 = result.insertId;
                        result = await pool.query('INSERT INTO Cita SET ?',[{horario,paciente: ids.id4,solicitante,tecnico}]);
                        if(result) {
                            res.json({
                                message: 'cita generada'
                            });
                        }else{res.json({message:'No se pudo crear la cita'})}
                    }else{res.json({message:'No se pudo crear el paciente'})}
                }else{res.json({message:'No fue posible juntar la persona con la direccion'})}
            }else{res.json({message:'No se agrego la direccion'})}
        }else{res.json({message:'No se agrego persona'})}
    }catch(error) {
        res.json({
            message: 'something were wrong',
            error
        });
    }
    
});



module.exports = router;