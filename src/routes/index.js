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
    let response = {};
    try{
        let usuario = await pool.query('SELECT idUsuario,contraseña,tipo FROM Usuario WHERE email=?',[email]);
        if (usuario.length > 0) {
            let result = await pool.query('SELECT * FROM Usuario WHERE tipo = ? AND active=1',[usuario[0].tipo]);
            if (result.length > 0) {
                response.message = 'No se pudo iniciar';
                if(usuario.tipo =='solicitante') {
                    response.type = 'pediatria';
                }else{
                    response.type ='alegologia';
                }
            }else{
                if (await encriptador.compare(contraseña,usuario[0].contraseña)) {
                    await pool.query('UPDATE Usuario SET active=1 WHERE idUsuario=?',[usuario[0].idUsuario]);
                    response.message ='credentials are correct';
                    response.type = usuario[0].tipo
                }else{
                    response.message = 'password is incorrect',
                    response.type = null
                }
            }
        }else{
            response.message = 'credentials are incorrect';
            response.type = null;
        }
    }catch(e) {
        res.redirec('/');
    }
    res.json(response);
});

router.get('/outSession', async(req,res) => {

})

module.exports = router;