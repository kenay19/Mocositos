const express = require('express');
const router = express.Router();

/**
 *  Pagina inicial de la aplicacion 
 *  la cual mostrara el login 
 */
router.get('/' ,(req,res) => {
    res.render('index');
});

module.exports = router;