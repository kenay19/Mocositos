const express = require('express');
const router = express.Router();

router.get('/' ,(req,res) => {
    res.render('tecnico');
});

router.get('/Estudy',(req,res) => {
    res.render('estudio');
});

module.exports = router;