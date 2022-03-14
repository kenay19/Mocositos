const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/' , async(req,res) => {
    res.render('tecnico');
});

router.get('/Estudy', async(req,res) => {
    res.render('estudio');
});

router.get('/pdf', (req,res)=>{
    res.render('pdf');
})


module.exports = router;