const express = require('express');
const router = express.Router();
const pool = require('../database');
const encriptador = require('bcryptjs');

/**
 Muestra el formulario para registrar empleados
*/
router.get('/' ,(req,res) => {
    res.render('admin');
});

router.get('/addEmployee',(req,res) => {
    res.render('addemployee');
});

router.get('/list' ,(req,res) => {
    res.render('listaempleados');
});

/**
 * Crea un nuevo usuario para la aplicacion
*/
router.post('/insert', async (req,res) => {
    const {email,contraseña,tipo,rfc,curp,cedulaProfesional,especialidad,nombre,app,apm,telefono,calle,inte,exte,colonia,municipio,estado,cp} = req.body;
    let result,ids;
    try{
        result = await pool.query('INSERT INTO Usuario SET ?',[{email,contraseña: await encriptador.hash(contraseña,10),tipo}]);
        if(result) {
            ids = {id1:result.insertId};
            result = await pool.query('INSERT INTO Persona SET ?',[{nombre,app,apm,telefono}]);
            if(result) {
                ids.id2 = result.insertId;
                result = await pool.query('INSERT INTO Direccion SET ?',[{calle,inte,exte,colonia,municipio,estado,cp}]);
                if(result) {
                    ids.id3 = result.insertId;
                    result = await pool.query('INSERT INTO Medico SET ?',[{rfc,curp,cedulaProfesional,especialidad,persona:ids.id2,usuario:ids.id1}]);
                    if(result) {
                        result = await pool.query('INSERT INTO UnionPD SET ?',[{persona: ids.id2,direccion:ids.id3}]);
                        if(result){
                            res.json({
                                message: 'new user insert correctly'
                            });
                        }else{res.json({message: 'No se pudo unir la persona con la direccion'})}
                    }else{res.json({message:'no se pudo crear al medico'})}
                }else{res.json({message:'No se pudo agregar la direccion'})}
            }else{res.json({message:'No se pudo crear a la persona '})}
        }else{res.json('no se pudo crear al usuario')}
    }catch(error){
        res.json({
            message: 'something were wrong',
            error
        });
    }

});

router.post('/list', async(req, res) => {
    const {tipo} = req.body;
    try {
        const result = await pool.query('SELECT idUsuario,idEmpleado,idPersona WHERE Usuario.tipo = ' + tipo + ' AND Empleado.usuario = Usuario.idUsuario AND Persona.idPersona = Empleado.persona');
        res.json(result);
    }catch(error) {
        console.error(error);
    }
})

module.exports = router;