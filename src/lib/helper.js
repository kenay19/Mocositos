
module.exports = {
    autheticate : (req,res,next) => {
        if(req.session.user) {
            if(req.session.user.tipo == 'solicitante' ) {
                if( req.originalUrl == '/pediatria' ||  req.originalUrl == '/pediatria/addPacient' ||  req.originalUrl == '/pediatria/showPDf/1'){
                    return next();
                }else{
                    return res.redirect('/pediatria');
                }
            }else if(req.session.user.tipo == 'tecnico'){
                if(req.originalUrl == '/tecnic' || req.originalUrl == '/tecnic/Estudy' || req.originalUrl == '/tecnic/pdf') {
                    return next();
                }else{
                    return res.redirect('/tecnic');
                }
            }
        }
        return res.redirect('/');
    },
    check: (req, res,next) => {
        if(req.session.user) {
            if(req.session.user.tipo == 'tecnico') {
                return res.redirect('/tecnic');
            }else{
                return res.redirect('/pediatria');
            }
        }else{
            return next();
        }
    }
}
