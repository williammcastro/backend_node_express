const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Heroes del Silencio') );
bands.addBand( new Band('Metallica') );


//console.log(bands); //ver las bandas en consola


//Mensajes de sockets:
io.on('connection', client => {//Escucha conexiones de los clientes y lo q sigue abajo lo ejecuta cuando alguien se conecta
   console.log('Cliente conectado en el backend index.js');

   client.emit('active-bands', bands.getBands() );

   //Votar por una banda:
   //la siguiente linea esta escuchando el mensaje de votos de la banda, es decir desde flutter 'vote-band'
   client.on('vote-band', ( payload ) => {
      console.log('Escuchando el voto de la banda id : ', payload );
      bands.voteBand( payload.id );
      io.emit('active-bands', bands.getBands() ); //Emito a todos los conectados al server con io, en vez de client o socket.
   });

   //Anadir una banda:
   client.on('add-band', ( payload ) => {
      console.log('Agregando la banda : ', payload );
      const newBand = new Band(payload.name);
      bands.addBand( newBand );
      io.emit('active-bands', bands.getBands() ); //Emito a todos los conectados al server con io, en vez de client o socket.
   });

   //Borrar una banda:
   client.on('delete-band', ( payload ) => {
      console.log('id de la banda a borrar : ', payload );
      bands.deleteBand( payload.id );
      io.emit('active-bands', bands.getBands() ); //Emito a todos los conectados al server con io, en vez de client o socket.
   });


   //Escuchar cuando se desconecta un cliente:
   client.on('disconnect', () => { 
        console.log('Cliente desconectado en el backend index.js');
   });

     // implementar event despues: client.on('event', data => { /* … */ });

     //Aqui se recibe el mensajeclave que envio el cliente desde index.html
     client.on('mensajeclave', ( payload ) => {
        console.log('recibido el mensaje clave en el backend index.js ;)', payload )

        //Ahora voy a responder cuando llegue el mensaje pero a todos los usuarios, pueden ser web o apps
        //puedo responder con emit(responder al cliente) o con io(todo el servidor)
        io.emit('mensajeclaverespuestaatodos', {admin: 'nuevo mensaje para todos desde el backend socket.js'});
     });

     //Mensaje desde la pag de status de flutter: un objeto con nombre y mensaje
     client.on('nuevo-mensaje', ( payload ) => {
        console.log('recibido nuevo-mensaje desde pagina status de flutter...payload : ', payload)//emite a todos
        //io.emit('morral', payload);//emite a todos
        //client.broadcast.emit('morral', payload);//emite a todos menos al que lo emitio
        client.broadcast.emit('emitir-mensaje', payload);
     });

});