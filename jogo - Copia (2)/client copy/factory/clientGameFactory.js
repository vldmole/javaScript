import createGame from "../../game.js";
import createCommands from "../../commands.js";
import createRender from "../view/render.js";
import createNetLayer from "../network/netLayer.js";
import createKeyboardCommandManager from "../keyboard/keyboardCommandManager.js"


function create(document)
{
   const game = createGame();
   const commandSet = createCommands(game);
   const commandManager = createKeyboardCommandManager(commandSet);
   document.addEventListener('keydown', commandManager.keydownListener);

   commandManager.addCommandListener(game.handleCommand);
   
   const netLayer = createNetLayer();
   netLayer.addEventListener('setup', game.setState);
   netLayer.addEventListener('refresh', game.setState);
   netLayer.addEventListener('connect', () => 
   {      
      const name = document.getElementById('gamerName').value;
      netLayer.sendCommand('credentials', {nickName: name});
   });

   commandManager.addCommandListener(command => 
   {
      netLayer.sendCommand('moveCommand', command.name);
   });

   const bConnect = document.getElementById('bConnect');
   bConnect.onclick = function()
   {
      const name = document.getElementById('gamerName').value;
      if(name)
         netLayer.connect();  
      else
         alert("Please choose a nick name.");
   }

   const canvas = document.getElementById('gameScreen');
   const gamersList = document.getElementById('gamersList');
   createRender(game.state, canvas, gamersList);   
}

export default 
{
   create: create
}