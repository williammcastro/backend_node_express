const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Heroes del Silencio') );
bands.addBand( new Band('Metallica') );


//console.log(bands); //ver las bandas


//Mensajes de sockets:
io.on('connection', client => {
    console.log('Cliente conectado en el backend index.js');

    client.emit('active-bands', bands.getBands() );
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado en el backend index.js');
     });

     // implementar event despues: client.on('event', data => { /* … */ });

     //Aqui se recibe el mensajeclave que envio el index.html
     client.on('mensajeclave', ( payload ) => {
        console.log('recibido el mensaje clave en el backend index.js ;)', payload )

        //Ahora voy a responder cuando llegue el mensaje pero a todos los usuarios, pueden ser web o apps
        //puedo responder con emit(responder al cliente) o con io(todo el servidor)
        io.emit('mensajeclaverespuestaatodos', {admin: 'nuevo mensaje para todos desde el backend index.js'});
     });

     client.on('nuevo-mensaje', ( payload ) => {
        console.log('recibido nuevo-mensaje...payload : ', payload)//emite a todos
        //io.emit('morral', payload);//emite a todos
        //client.broadcast.emit('morral', payload);//emite a todos menos al que lo emitio
        client.broadcast.emit('emitir-mensaje', payload);

     })

});