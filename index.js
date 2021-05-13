//para correr el server: node index.js o node index
//para detener el server: Ctrl C
//para correr el server con nodemon: nodemon index
//con nodemon baja y sube el servidor node cuando hago cambios en los archivos como este.
//para correrlo con el start de acuerdo a lo q coloque en packages.json es: npm run start:dev o: npm start

const express = require('express');
const path = require('path');
require('dotenv').config();

//App de Express:
const app = express();

//Node Server - creacion del servidor de sockets node
const server = require('http').createServer(app);
//const io = require('socket.io')(server);//si tengo los mensajes en este archivo lo hago sin exportar 
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Mensajes de sockets:
//se migra a sockets.js y se importa con require


//var port = 3000;
const port = process.env.PORT;


//path publico
const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static( publicPath ) );

//app.get('/', (req, res) => res.send('Hola mundo en node...Servidor corriendo en el puerto', port));
//la anterior no funca x q express cambio la funcion a la siguiente:

app.get('/', (req, res) => res.status(200).send('Hola mundo en node...Servidor corriendo en el puerto : ' + (port).toString() ));

server.listen( port, ( err ) => {
    if ( err ) throw new Error(err);
    console.log('Servidor corriendo en el puerto', port);


});


