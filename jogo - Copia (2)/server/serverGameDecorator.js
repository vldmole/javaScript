import { Server as SocketServer}  from "socket.io";
import createCommands from '../common/commands.js';

export default function createServerGame(game, httpServer)
{
   const socketServer = new SocketServer(httpServer);
   const commandSet = createCommands(game);

   //--------------------------------------------------------------------------
   socketServer.on('connection', socket => 
   {
      game.addPlayer(socket.id);
      game.state.currentPlayerId = socket.id;
      socket.emit('setup', game.state);

      socket.on('credentials', credentials => 
      {
         credentials.playerId = socket.id;
         game.handleCredentials(credentials);
         emitRefresh();
      });
      
      socket.on('moveCommand', commandName =>
      {
         const command = commandSet.getCommand(commandName);
         game.handleCommand(command, socket.id);
         emitRefresh();
      });

      socket.on('disconnect', (reason)=> 
      {   
         game.removePlayer(socket.id);
         emitRefresh();
      });

      socket.on('close', (reason)=> 
      {
         game.removePlayer(socket.id);
         emitRefresh();
      });
   })

   //--------------------------------------------------------------------------
   function emitRefresh()
   {
      game.state.currentPlayerId = null;
      socketServer.emit('refresh', game.state);
   }

   //--------------------------------------------------------------------------
   const serverGameDecorator = { 
      game: game,
      setState: game.setState,
      addPlayer: game.addPlayer,
      removePlayer: game.removePlayer,
      handleCommand: game.handleCommand,
      handleCredentials: game.handleCredentials,

      socketServer: socketServer,
      commandSet: commandSet,
   }
   return serverGameDecorator;
}