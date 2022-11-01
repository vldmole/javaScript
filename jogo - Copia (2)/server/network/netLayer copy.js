import { Server as SocketServer, Socket }  from "socket.io";

function createNetLayer(httpServer, game)
{
   const sockets = new SocketServer(httpServer);

   sockets.on('connection', socket => {

      socket.on('credentials', credentials => handleCredentials(credentials, socket.id));

      socket.on('command', command => handleCommands(command, socket.id) );

      socket.on('disconnect', (reason)=> removePLayer(socket.id));

      socket.on('close', (reason)=> removePLayer(socket.id));
      
      addPlayer(socket);
      console.log(`new connection id:${socket.id}`);      
   });

   function addPlayer(socket)
   {
      game.addPlayer(socket.id);
        
      game.state.currentPlayerId = socket.id;
      socket.emit('setup', game.state)
      sockets.emit('refresh', game.state);
   }

   function removePLayer(id)
   {
      game.removePlayer(id);
      sockets.emit('refresh', game.state);

      console.log('player disconnected');
   }
   
   function handleCommands(command, playerId) 
   {
      game.handleCommand(command, playerId);
      sockets.emit('refresh', game.state);
   }

   function handleCredentials(credentials, playerId)
   {
      console.log(credentials);
      game.handleCredentials(credentials, playerId);
      sockets.emit('refresh', game.state);
   }
}

const netLayer = {
   create: create
}

export default netLayer;