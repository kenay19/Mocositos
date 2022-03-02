const express = require('express');
const router = express.Router();
const pool = require('../database');
const encriptador = require('bcryptjs');

/**
 *  Pagina inicial de la aplicacion 
 *  la cual mostrara el login 
 */
router.get('/' ,(req,res) => {
    res.render('index');
});

/**
 * Verifica si hay sesion si la hay regresa un dato 
 */
router.post('/', async (req,res) => {
    const {email,contraseña} = req.body;
    let result = await pool.query('SELECT contraseña,tipo FROM Usuario WHERE email=?',[email]);
    if (result.length > 0) {
        if (await encriptador.compare(contraseña,result[0].contraseña)) {
            res.json({
                message: 'credentials are correct',
                type : result[0].tipo
            });
        }else{
            res.json({
                message: 'password is incorrect',
                type: 'null'
            });
        }
        
    }else{
        res.json({
            message: 'email and password is incorrect',
            type : 'null'
        });
    }
    
});

/**
 * Crea un nuevo usuario para la aplicacion
*/
router.post('/insert', async (req,res) => {
    const {email,contraseña,tipo} = req.body;
    const statement = {
        email,
        contraseña: await encriptador.hash(contraseña,8),
        tipo
    }
    console.log(statement)
    let result = await pool.query('INSERT INTO Usuario SET ?',[statement]);
    res.json(result);
});
module.exports = router;