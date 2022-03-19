const express = require('express');
const router = express.Router();
const pool = require('../database');
const encriptador = require('bcryptjs');
const {check} = require('../lib/helper');
/**
 *  Pagina inicial de la aplicacion
 *  la cual mostrara el login
 */
router.get('/',check,(req,res) => {
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
            if (await encriptador.compare(contraseña,usuario[0].contraseña)) {
                req.session.user = usuario[0];
                response.message ='credentials are correct';
                response.type = usuario[0].tipo
            }else{
                response.message = 'password is incorrect',
                response.type = null
            }
        }else{
            response.message = 'credentials are incorrect';
            response.type = null;
        }
    }catch(e) {
        res.redirect('/');
    }
    res.json(response);
});

router.get('/outSession',(req,res) => {
    console.log('hola')
    req.session.destroy();
    res.redirect('/');
})
module.exports = router;