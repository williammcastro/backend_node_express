const { io } = require('../index');


//Mensajes de sockets:
io.on('connection', client => {
    console.log('Cliente conectado en el backend index.js');
    
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

});