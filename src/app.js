const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const session = require('express-session');
const myConnection = require('express-myconnection');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const app = express();


//importing routes
const casosRoute = require('./routes/casos');
const hospRoute = require('./routes/hospital');
const usersRoute = require('./routes/usuarios');

//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,
    {
        host:'b5pofpw3ei4wd0sy1eea-mysql.services.clever-cloud.com',
        user: 'u5hoog4tmttkkj9h',
        password: 'u5hoog4tmttkkj9h',
        port: 3306,
        database:'b5pofpw3ei4wd0sy1eea'
    },'single'));
app.use(express.urlencoded({extended: false}));

//invocamos dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});


//variables de sesion
app.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables globales
app.use(function(req, res, next){
    app.locals.success_msg = req.flash("success_msg");
    app.locals.error_msg = req.flash("error_msg");
    app.locals.error = req.flash("error");
    app.locals.user = req.user || null;
    next();
  });
//routes
app.use('/',casosRoute);
app.use('/',hospRoute);
app.use('/',usersRoute);

//invocamos modulo de la bd
const connection = require('../database/db');
passport.use('local',new passportLocal({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req,username,password,done){
        connection.query("select * from usuarios where nombreU = ?",[username],function(err, results){
            if(err){
                return done(err);        
            }
            if(!results.length){       
                return done(null, false, req.flash('error_msg','Usuario no encontrado'));       
            }
            if(!(results[0].contraseña == password))
            {
                return done(null, false, req.flash('error_msg','Contraseña incorrecta'));
            }
            return done(null, results[0]);
        });
}));

//serializacion del usuario
passport.serializeUser(function(user,done){
done(null, user.idusuario);
});

//deserialiacion del usuario
passport.deserializeUser(function(id,done){
    connection.query("select idusuario,nombreU from usuarios where idusuario = "+id, function(err, results){
        console.log(results);
        done(err,results[0]);
    })
})

//render login 
app.get('/', function(req, res)
{  
    res.render('login'); 
});
//logout and redirect to login
app.get('/logout',function(req, res){
    req.logOut();
    res.redirect('/');
});
//render cases crud
app.get('/casos', function(req, res){
       
        res.render('casos'); 	 
});
//render hospital's crud
app.get('/hospitallist', function(req, res){
    res.render('hospital');
});
//render users crud
app.get('/usuarioslist',function(req, res){
    res.render('usuarios');
});


//to authenticate users with passport
app.post('/auth',passport.authenticate('local',{ 
    successRedirect: '/casos',
    failureRedirect: '/',
    failureFlash: true,
    }
));


//static files
app.use(express.static(path.join(__dirname,'public')));

//starting server
app.listen(app.get('port'), function(){
    console.log(`Server on port ${app.get('port')}`);
});

//loggin without passport
/*app.post('/auth', (req, res)=>{
    let usuario = req.body.nombreU;
    let contraseña = req.body.contraseña;
    if(usuario && contraseña){
        connection.query('select * from usuarios where nombreU = ? AND contraseña = ?',[usuario,contraseña],(error, results)=>{
            if(results.length>0)
            {
                req.session.loggedin = true;
                req.session.username = usuario;
                res.render('login',{
                    alert: true,
                    alertTitle: "Correcto",
                    alertMessage:"Inicio de sesion exitoso",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'casos'
                });
               
            }else{
                res.render('login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage:"Usuario o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 2000,
                    ruta: '/'
                });              
            }
        })
    }else{
        //res.send('Ingrese un usuario y una contraseña');
        res.render('login',{
            alert: true,
            alertTitle: "Error",
            alertMessage:"Campos vacios, ingrese su usuario y contraseña",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 2000,
            ruta: '/'
        });       
    }
});*/