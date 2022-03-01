const express = require('express');
const router = express.Router();
const con = require('../database');

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
    let result = await pool.query('SELECT * FROM Usuario WHERE ?',[req.body]);
    console.log(result);
});
module.exports = router;