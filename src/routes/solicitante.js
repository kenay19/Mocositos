const express = require('express');
const router = express.Router();

router.get('/' ,(req,res) => {
    res.render('pediatra');
});

router.get('/addPacient', (req,res) => {
    res.render('pacientForm');
});
module.exports = router;