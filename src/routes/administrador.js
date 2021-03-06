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

router.get('/list' , (req,res) => {
    res.render('listaempleados');
});

router.post('/list', async(req,res) => {
    const row = await pool.query('SELECT idMedico,nombre,app,apm,especialidad FROM Medico,Persona WHERE Medico.persona = Persona.idPersona')
    res.json(row)
})
/**
 * Crea un nuevo usuario para la aplicacion
*/
router.post('/insert', async (req,res) => {
    const {email,contraseña,tipo,rfc,curp,cedulaProfesional,especialidad,nombre,app,apm,telefono,calle,inte,exte,colonia,municipio,estado,cp} = req.body;
    let result,ids;
    try{
        result = await pool.query('INSERT INTO Usuario(email,contraseña,tipo,active)VALUES(?,?,?,?)',[email,await encriptador.hash(contraseña,10),tipo,'false' ]);
        if(result) {
            ids = {id1:result.insertId};
            result = await pool.query('INSERT INTO Persona(nombre,app,apm,telefono)VALUES(?,?,?,?)',[nombre,app,apm,telefono]);
            if(result) {
                ids.id2 = result.insertId;
                result = await pool.query('INSERT INTO Direccion(calle,inte,exte,colonia,municipio,estado,cp)VALUES(?,?,?,?,?,?,?)',[calle,inte,exte,colonia,municipio,estado,cp]);
                if(result) {
                    ids.id3 = result.insertId;
                    result = await pool.query('INSERT INTO Medico(rfc,curp,cedulaProfesional,especialidad,persona,usuario)VALUES(?,?,?,?,?,?)',[rfc,curp,cedulaProfesional,especialidad,ids.id2,ids.id1]);
                    if(result) {
                        result = await pool.query('INSERT INTO UnionPD (persona,direccion)VALUES(?,?)',[ids.id2,ids.id3]);
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
        console.error(error);
        res.json(error);}

});

router.post('/list', async(req, res) => {
    const {tipo} = req.body;
    try {
        const result = await pool.query('SELECT idUsuario,idMedico,idPersona FROM Usuario,Medico,Persona WHERE Usuario.tipo = ' + tipo + ' AND Empleado.usuario = Usuario.idUsuario AND Persona.idPersona = Medico.persona');
        res.json(result);
    }catch(error) {
        console.error(error);
    }
});

router.get('/delete/:idMedico' , async(req, res) => {
    const {idMedico} = req.params;
    let result = await pool.query('SELECT idUsuario,idPersona,idDireccion FROM Usuario,Medico,Persona,Direccion,UnionPD WHERE Medico.idMedico=? AND Usuario.idUsuario=Medico.usuario AND Persona.idPersona = Medico.persona AND UnionPD.persona=Persona.idPersona AND Direccion.idDireccion = UnionPd.direccion',[idMedico]);
    result = await pool.query('DELETE FROM Medico WHERE idMedico=?',[idMedico]);
    result = await pool.query('DELETE FROM UnionPD WHERE Direccion=? AND Persona=?',[result.idDireccion,result.idPersona]);
    result = await pool.query('DELETE FROM Usuario WHERE idUsuario=?',[result.idUsuario]);
    result = await pool.query('DELETE FROM Persona WHERE idPersona=?',[result.idPersona]);
    result = await pool.query('DELETE FROM Direccion WHERE idDireccion=?',[result.idDireccion]);
    res.redirect('/admin/list');
});

router.get('/modify', (req,res) => {
    res.render('update');
});

router.post('/modify', async(req,res) => {
    const {idMedico} = req.body;
    res.json(await pool.query('SELECT * FROM Usuario,Medico,Persona,Direccion,UnionPD WHERE Medico.idMedico=? AND Usuario.idUsuario=Medico.usuario AND Persona.idPersona = Medico.persona AND UnionPD.persona=Persona.idPersona AND Direccion.idDireccion = UnionPd.direccion',[idMedico]));
});

router.post('/update/', async(req,res) => {
    const {idMedico,tipo,email,rfc,curp,contraseña,cedulaProfesional,especialidad,nombre,app,apm,telefono,calle,inte,exte,colonia,municipio,estado,cp} = req.body;
    let result = await pool.query('SELECT idUsuario,idPersona,idDireccion FROM Usuario,Medico,Persona,Direccion,UnionPD WHERE Medico.idMedico=? AND Usuario.idUsuario=Medico.usuario AND Persona.idPersona = Medico.persona AND UnionPD.persona=Persona.idPersona AND Direccion.idDireccion = UnionPd.direccion',[idMedico]);
    await pool.query('UPDATE Direccion SET calle=?,inte=?,exte=?,colonia=?,municipio=?,estado=?,cp=? WHERE idDireccion=?',[calle,inte,exte,colonia,municipio,estado,cp,result[0].idDireccion]);
    await pool.query('UPDATE Persona SET nombre=?,app=?,apm=?,telefono=? WHERE idPersona=?',[nombre,app,apm,telefono,result[0].idPersona]);
    await pool.query('UPDATE Usuario SET email=?,contraseña=?,tipo=? WHERE idUsuario=?',[email,await encriptador.hash(contraseña,10),tipo,result[0].idUsuario]);
    await pool.query('UPDATE Medico SET rfc=?,curp=?,cedulaProfesional=?,especialidad=? WHERE idMedico=?',[rfc,curp,cedulaProfesional,especialidad,idMedico]);
    res.redirect('admin/list');
});

router.get('/getType', async (req, res) => {
    const result = await pool.query('SELECT especialidad FROM Medico');
    res.json(result);
});

module.exports = router;