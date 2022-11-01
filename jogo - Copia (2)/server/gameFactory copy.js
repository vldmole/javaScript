import createGame from '../common/game.js';
import createCommands from '../common/commands.js';
import createNetLayer from '../server/network/netLayer.js';

function create(httpServer)
{
   const game = createGame();
   const commandSet = createCommands(game);
 
   const netLayer = createNetLayer(httpServer);
   netLayer.addEventListener('newConnection', game.addPlayer);
   netLayer.addEventListener('credentials', game.handleCredentials);
  
   netLayer.addEventListener('moveCommand', data => 
   {
      const command = commandSet.getCommand(data.commandName);
      if(command)
         game.handleCommand(command, data.playerId);

      netLayer.sendCommandToAll('refresh', game.state);   
   });

   netLayer.addEventListener('newConnection', playerId =>
   {
      game.state.currentPlayerId = playerId;
      netLayer.sendCommand('setup', playerId, game.state);
   })

   return game;
}

export default {
   create: create
}