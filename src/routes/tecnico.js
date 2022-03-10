const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/' , async(req,res) => {
    const result = await pool.query('SELECT * FROM Cita WHERE horario >'+Date.parse(new Date().toLocaleDateString()));
    res.render('tecnico',{result});
});

router.get('/Estudy', async(req,res) => {
    const result = await pool.query('SELECT * FROM Antigenos')
    res.render('estudio',{result});
});


module.exports = router;