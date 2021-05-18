const helpers ={};
                            //funcion
helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','No estas autorizado');
        res.redirect('/');      
    }
}

module.exports = helpers;