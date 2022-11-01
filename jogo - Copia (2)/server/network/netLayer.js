import { Server as SocketServer, Socket}  from "socket.io";
import createEventListenerManager from "../../utilities/eventListenerManager.js";

export default function createNetLayer(httpServer)
{
   const netLayer = {
      eventEmitter: createEventListenerManager()
   }

   //-------------------------------------------------------------------------
   netLayer.addEventListener = function(eventName, fnListener)
   {
      netLayer.eventEmitter.addEventListener(eventName, fnListener);
   }

   //-------------------------------------------------------------------------
   netLayer.removeEventListener = function(eventName, fnListener)
   {
      netLayer.eventEmitter.removeEventListener(eventName, fnListener);
   }

   
   const socketServer = new SocketServer(httpServer);
   netLayer.socketServer = socketServer;

   socketServer.on('connection', socket=> {

      netLayer.eventEmitter.dispatchWithData('newConnection', socket.id);
      
      socket.on('credentials', credentials => {
         credentials.playerId = socket.id;
         netLayer.eventEmitter.dispatchWithData('credentials', credentials);
      });
      
      socket.on('moveCommand', commandName => {
         
         netLayer.eventEmitter.dispatchWithData('moveCommand', {commandName: commandName, playerId: socket.id});
      });

      socket.on('disconnect', (reason)=> {
         
         netLayer.eventEmitter.dispatchWithData('disconnect', socket.id)
      });

      socket.on('close', (reason)=> {
         
         netLayer.eventEmitter.dispatchWithData('disconnect', socket.id)
      });
   })

   netLayer.sendCommand = function(commandName, socketId, ...data)
   {
      socketServer.in(socketId).fetchSockets()
         .then(socketsList => {
            socketsList.forEach(socket => {
               socket.emit(commandName, ...data);
            })
         });         
   }

   netLayer.sendCommandToAll = function(commandName, ...data)
   { 
      socketServer.emit(commandName, ...data);
   }
   return netLayer;
}

   /*
   socketServer.on('connection', socket => {

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
      socketServer.emit('refresh', game.state);
   }

   function removePLayer(id)
   {
      game.removePlayer(id);
      socketServer.emit('refresh', game.state);

      console.log('player disconnected');
   }
   
   function handleCommands(command, playerId) 
   {
      game.handleCommand(command, playerId);
      socketServer.emit('refresh', game.state);
   }

   function handleCredentials(credentials, playerId)
   {
      console.log(credentials);
      game.handleCredentials(credentials, playerId);
      socketServer.emit('refresh', game.state);
   }
}

const netLayer = {
   create: create
}

export default netLayer;
*/