// Modulos

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');

// Initiaizations

const server = express();

// Settings

server.set('port',process.env.PORT || 4000);
server.set('views',path.join(__dirname,'views'));
server.engine('.hbs',exphbs.engine({
    defaultLayout : 'main',
    layoutsDir: path.join(server.get('views'),'layouts'),
    partialsDir: path.join(server.get('views'),'partials'),
    extname : '.hbs',
    helpers: require('./lib/helper')
}));
server.set('view engine','.hbs');

// Middlewares

server.use(morgan('combined'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(session({
    secret: process.env.SESSION_SECRET || 'production2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

//  Routes

server.use(require(path.join(__dirname,'routes')));
server.use('/admin',require(path.join(__dirname,'routes/administrador.js')));
server.use('/pediatria',require(path.join(__dirname,'routes/solicitante.js')));
server.use('/tecnic',require(path.join(__dirname,'routes/tecnico.js')));


// Global Varables
// Public Files

server.use(express.static(path.join(__dirname,'public')));

// Listening Server

server.listen(server.get('port'), () => {
    console.log("Server on port: ",server.get('port'));
});