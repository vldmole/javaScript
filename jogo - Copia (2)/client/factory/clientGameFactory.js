import createGame from "../../game.js";
import createCommands from "../../commands.js";

import createKeyboardCommandManager from "../keyboard/keyboardCommandManager.js"
import createClientNetDecorator from "../network/clientNetworkDecorator.js";
import createWebViewCtrl from "../view/webViewCtrl.js"

function create(document)
{
   const game = createGame();
   const commandSet = createCommands(game);
   
   const commandManager = createKeyboardCommandManager(commandSet);
   document.addEventListener('keydown', commandManager.keydownListener);
   commandManager.addCommandListener(game.handleCommand);

   const clientNet = createClientNetDecorator(game);
   const webViewCtrl = createWebViewCtrl(game.state, document);

   commandManager.addCommandListener(command => {

      clientNet.send('moveCommand', command.name);
   });

   webViewCtrl.setConnectButtonAction( ()=>
   {
      const nickName = webViewCtrl .getNickName();
      if(nickName)
      {
         clientNet.connect(); 
         clientNet.send('credentials', {nickName: nickName}); 
      }
      else
         alert("Please choose a nick name.");
   })
}

export default 
{
   create: create
}